class Query  {
    constructor(){
        this.useStaging = true;
        this.localTestApiURL = "http://localhost:8080";
        this.apiURL = "http://gitsearch-demo-api.kvtx.io";
    }
    getApiUrl(){
        return (this.useStaging ? this.localTestApiURL : this.apiURL);
    }
    prepDataForAPI(data){
        return JSON.stringify({data});
    }
    async makeQuery(query){
        let url = `${this.getApiUrl()}/gitsearch/find`;
        return fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:this.prepDataForAPI(query), // body data type must match "Content-Type" header
        })
        .then(res => res.json())
        .then(response => {
            console.log(response);
            if('data' in response && 'items' in response.data){
                return response.data.items;
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

export default Query;
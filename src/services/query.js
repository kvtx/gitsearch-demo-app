class Query {
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
    makeQuery(data){
        let url = `${this.getApiUrl()}/gitsearch/find`;
        fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                //'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:this.prepDataForAPI(data), // body data type must match "Content-Type" header
        })
        .then(res => res.json())
        .then(response => {
            if('data' in response){
                this.handleResData(response.data);
            }
        })
        .catch(error => console.error('Error:', error));
    }
    handleResData(response){
        console.log(response);
    }
}

export default Query;
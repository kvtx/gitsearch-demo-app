//handle querying API to get repos from github based on query
class Query  {
    constructor(){
        this.useStaging = false;
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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body:this.prepDataForAPI(query),
        })
        .then(res => res.json())
        .then(response => {
            if('data' in response && 'items' in response.data){
                return response.data;
            }
        })
        .catch(error => {return {'error':error}});
    }
}

export default Query;
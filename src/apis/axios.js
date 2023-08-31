import axios from "axios";

export function getRequest(api) {
    const url = api;
    console.log(url, process.env.REACT_APP_API_KEY);
    const headers = {
        'X-CoinAPI-Key': process.env.REACT_APP_API_KEY,
    };

    return axios.get(url, { headers })
        .then(response => {
            return ({ Data: response.data });
        })
        .catch(error => {
            return ({Error: error});
        });

} 

export function postRequest(api, payload) {
    const url = api;
    axios.post(url,{payload})
    .then(response=>{
        alert("Data saved successfully!!")
    })
    .catch(error=>{
        alert("Something went wrong!! ")
    })
}


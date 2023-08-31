import axios from "axios";

//  Performs an HTTP GET request to the specified API endpoint.
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
            return ({ Error: error });
        });

}

// Performs an HTTP POST request to the specified API endpoint.
export function postRequest(api, payload) {
    const url = api;
    axios.post(url, { payload })
        .then(response => {
            alert("Data saved successfully!!")
        })
        .catch(error => {
            console.log("Something went wrong!! ")
        })
}



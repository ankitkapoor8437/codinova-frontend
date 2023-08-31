import axios from "axios";
import { addExchangeData, addExchangeIcon } from "./routes";

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


export function getExchangeData(api) {
    const url = process.env.REACT_APP_NODE_BACKEND_URL + api;
    return axios.get(url)
        .then(response => {
            return (response.data);

        })
        .catch(error => {
            return ({ Error: error });
        })
}


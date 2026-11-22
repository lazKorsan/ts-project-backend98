import axios from 'axios';
import assert from "node:assert/strict";

let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://qa.instulearn.com/api/pricePlans',
    headers: {
        'x-api-key': '1234',
        'Accept': 'application/json',
        'Authorization': 'Bearer 34510|yDrNx0Ld71BJAz7BEPQjYQ7R8TAGDY0IzpsX61CU'
    }
};

axios.request(config)
    .then((response: { data: any; }) => {
        console.log(JSON.stringify(response.data));
        assert.strictEqual(response.data.status, 200);


    })
    .catch((error: any) => {
        console.log(error);
    });





import assert from "assert";

var axios = require('axios');

var config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://qa.instulearn.com/api/pricePlans',
    headers: {
        'x-api-key': '1234',
        'Accept': 'application/json',
        'Authorization': 'Bearer 34510|yDrNx0Ld71BJAz7BEPQjYQ7R8TAGDY0IzpsX61CU',
    }

};

axios(config)
    .then(function (response: { data: any; }) {

        console.log(JSON.stringify(response.data));
        assert.strictEqual(response.data.status, 200);
        console.dir('StatusCode testi geçti');
    })
    .catch(function (error: any) {
        console.log(error);
    });

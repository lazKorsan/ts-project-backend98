import {Template} from "../../../Template";
import assert from "assert";

var axios = require('axios');


var config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${Template.baseUrl}/api/pricePlans`,
    headers: {
        'x-api-key': '1234',
        'Accept': 'application/json',
        'Authorization': Template.token,
    }
};

axios(config).then(function (response: { data: any; }) {

    console.log(response.data);

    assert.strictEqual(response.data.status, 200);
    console.dir('🚀 Status testi geçti');

    assert.strictEqual(response.data.remark, 'success');
    console.dir('🚀 Remark testi geçti');












    })
    .catch(function (error: any) {
        console.log(error);
    });

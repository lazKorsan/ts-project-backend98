import {Template} from "../../../Template";
import assert from "assert";

const axios = require('axios');


let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: 'https://qa.instulearn.com/api/pricePlans',
    headers: {
        'x-api-key': '1234',
        'Accept': 'application/json',
        'Authorization': Template.token
    }
};


// test alani

axios.request(config).then((response: { data: any; }) => {


    console.log(response.data);

    assert.strictEqual(response.data.status, 200);
    console.dir('🌐 Status testi gecti');

    assert.strictEqual(response.data.remark, 'success');
    console.dir('🌐 Remark Testi geçti');


})
    .catch((error: any) => {
        console.log(error);
    });

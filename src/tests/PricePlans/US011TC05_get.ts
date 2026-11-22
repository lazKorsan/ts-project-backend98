import axios from 'axios';
import assert from "node:assert/strict";

/*
 Desciption:
 Acceptance Criterias:

 */


async function runXyzt() {
    console.dir('TestinKisaTanimi',);
    // 1. Token al
    const tokenResponse = await axios.request({
        method: 'post',
        url: 'https://qa.instulearn.com/api/token',
        headers: {
            'Accept': 'application/json',
            'x-api-key': '1234'
        },
        data: {
            email: 'ahmet.admin@instulearn.com',
            password: 'Learn.123'
        }
    });

    const token = tokenResponse.data.data.access_token;
    console.log('Token:', token);
    console.log(tokenResponse.data);

    assert.strictEqual(tokenResponse.status, 200);
    assert.strictEqual(tokenResponse.data.data.token_type, 'Bearer');
    console.log('Tum token testleri gecti')

    const getResponse = await axios.request({
        method: 'get',
        url: 'https://qa.instulearn.com/api/pricePlans',
        headers: {
            'Accept': 'application/json',
            'x-api-key': '1234',
            'Authorization': `Bearer ${token}`
        }
    });

    console.dir(getResponse.data, {depth: null, colors: true});

    assert.strictEqual(getResponse.status, 200, "Status code 200 değil!");
    console.dir('   ✅ Status Code 200 doğrulandı.');

    assert.strictEqual(getResponse.data.remark, 'success', "Remark 'success' değil!");
    console.dir('   ✅ Remark "success" doğrulandı.');






}

runXyzt().catch(console.error);
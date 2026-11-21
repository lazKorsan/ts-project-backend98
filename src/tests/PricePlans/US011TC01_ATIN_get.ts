// Yol derinliğe göre değişir ama bu normal
import axios from 'axios';
import assert from "node:assert/strict";
import {Config} from "../../../Config";


async function runUS011TC01_ATIN() {

    const tokenResponse = await axios.request({
        method: 'post',
        url: 'https://qa.instulearn.com/api/token',
        headers: {
            'Accept': Config.accept,
            'x-api-key': Config.apiKey,
        },
        data: {
            email: Config.adminEmail,
            password: Config.adminPassword,
        }
    });

    const token = tokenResponse.data.data.access_token;
    console.log('Token:', token);

    // Config.baseUrl hazır! .env ile uğraşmıyoruz.
    const response = await axios.get(`${Config.baseUrl}/api/pricePlans`, {
        headers: {
            'Accept': 'application/json',
            'x-api-key': Config.apiKey,
            'Authorization': `Bearer ${token}`,
        },
    });

    assert.strictEqual(response.status, 200, "Status code 200 değil!");
    console.log('   ✅ Status Code 200 doğrulandı.');

    assert.strictEqual(response.data.remark, 'success', "Remark 'success' değil!");
    console.log('   ✅ Remark "success" doğrulandı.');

}

runUS011TC01_ATIN().catch(console.error);
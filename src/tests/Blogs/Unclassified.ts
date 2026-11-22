import axios from 'axios';
import 'dotenv/config';

import assert from 'assert';
import {Template} from "../../../Template";


async function runUS011TC01() {
    try {
        // 1. ADIM: NativeAuthentication sınıfından taze token al



        // 2. ADIM: Aldığın token ile GET isteğini at
        const response = await axios.get('https://qa.instulearn.com/api/pricePlans', {
            headers: {
                'Accept': 'application/json',
                'x-api-key': '1234',
                'Authorization': Template.token,
            },
        });

        console.log('Status Code:', response.status);
       // console.log('Gelen Data:', JSON.stringify(response.data, null, 2));
        console.dir(response.data, {depth: null, colors: true});

        assert.strictEqual(response.status, 200, "Status code 200 değil!");
        console.log('✅ Status Code 200 doğrulandı.');

        // Remark Kontrolü
        assert.strictEqual(response.data.remark, 'success', "Remark 'success' değil!");
        console.log('✅ Remark "success" doğrulandı.');

    } catch (error: any) {
        console.error('Hata Oluştu:');
        console.error('Status Code:', error.response?.status);
        console.error('Data:', error.response?.data || error.message);
    }


    // Status Code Kontrolü

}

runUS011TC01();
// Yol derinliğe göre değişir ama bu normal
import axios from 'axios';
import assert from "node:assert/strict";
import {TestRunner} from "../../NativeUtils/TestRunner";
import {NativeAuthentication} from "../../NativeUtils/NativeAuthentication";
import {Config} from "../../NativeUtils/Config";




async function runUS011DataParsing() {
    await TestRunner.run('US011DataParsing.ts - GET Price Plans', async () => {
        const token = await NativeAuthentication.getAdminToken();
        console.log('Alınan Token:', token);

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
    });
}

runUS011DataParsing();
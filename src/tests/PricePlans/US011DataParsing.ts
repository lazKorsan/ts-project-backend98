// US011DataParsing.ts
import axios from 'axios';
import 'dotenv/config';
import assert from "node:assert/strict";
import {APIMethods} from "../Blogs/US001AdminToken";


async function runUS011DataParsing() {

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


        // 2. ADIM: GET İsteğini At
        const response = await axios.get('https://qa.instulearn.com/api/pricePlans', {
            headers: {
                'Accept': 'application/json',
                'x-api-key': '1234',
                'Authorization': `Bearer ${token}`,
            },
        });

        // 3. ADIM: Doğrulamalar
        assert.strictEqual(response.status, 200, "Status code 200 değil!");
        console.log('   ✅ Status Code 200 doğrulandı.');

        assert.strictEqual(response.data.remark, 'success', "Remark 'success' değil!");
        console.log('   ✅ Remark "success" doğrulandı.');

        // 4. ADIM: Ham veriyi al (fallback ile)
        const plans = response.data.data || [];

        // 5. ADIM: ID'leri listele
        if (Array.isArray(plans) && plans.length > 0) {
            console.log("ID Listesi:");
            plans.forEach((plan: any, index: number) => {
                console.log(`  [${index}] id: ${plan.id}`);
            });
        } else {
            console.log("⚠️ Dizi boş veya bulunamadı!");
        }

        // 6. ADIM: ID'leri sayıya çevirip temizle
        const idListesi = plans
            .map((plan: any) => Number(plan.id))
            .filter((id: number) => !isNaN(id));

        // 7. ADIM: Max ve Min ID'yi hesapla
        if (idListesi.length > 0) {
            const maxID = Math.max(...idListesi);
            const minID = Math.min(...idListesi);
            console.log(`📈 Max ID: ${maxID}`);
            console.log(`📉 Min ID: ${minID}`);
        } else {
            console.log("⚠️ ID listesi boş, max/min ID hesaplanamadı.");
        }

}

runUS011DataParsing();
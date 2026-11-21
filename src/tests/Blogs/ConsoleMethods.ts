import axios from 'axios';
import assert from "node:assert/strict";

/*
 Desciption: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip blog bilgilerini silebilmek istiyorum.
 Acceptance Criterias:
 (id) icermeyen bir DELETE request gönderildiginde de
dönen status code'in 203,
response body'deki remark bilgisinin "failed" ve
message bilgisinin de "No id" oldugu dogrulanmali.
 */


async function consoleMethods(): Promise<void> {
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

    const deleteResponse = await axios.request({

        method: 'delete',
        url: 'https://qa.instulearn.com/api/deleteBlog/',
        headers: {
            'Accept': 'application/json',
            'x-api-key': '1234',
            'Authorization': `Bearer ${token}`
        }
    });





    console.log(JSON.stringify(deleteResponse.data, null, 2));

    console.table({

        'Status': deleteResponse.status,
        'Remark': deleteResponse.data.remark,
        'Message': deleteResponse.data.data.message,
    });

    assert.strictEqual(deleteResponse.status, 203);
    assert.strictEqual(deleteResponse.data.remark, 'failed');
    assert.strictEqual(deleteResponse.data.data.message, 'No id');

    console.log('Delete testleri gecti');

    const ok   = (m: string) => console.log(`\x1b[32m✔ ${m}\x1b[0m`);   // yeşil
    const info = (m: string) => console.log(`\x1b[36mℹ ${m}\x1b[0m`);   // cyan

    info(`Gönderilen ID: ${deleteResponse.status} | Dönen Remark: ${deleteResponse.data.remark} | Donen Message: ${deleteResponse.data.data.message}`);
    ok('Delete testleri gecti testi geçti');




}

consoleMethods().catch(console.error);
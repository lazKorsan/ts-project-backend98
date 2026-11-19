import axios from 'axios';
import assert from "node:assert/strict";

/*
 Desciption:Bir yönetici olarak API bağlantısı üzerinden yeni bir blog kaydı olusturabilmek istiyorum.
 Acceptance Criterias:
  /api/blogs endpoint'ine
 gecerli authorization bilgileri ile
 bir GET request gönderildiginde
 dönen status code'in 200 ve
 response body'deki remark bilgisinin "success" oldugu dogrulanmali.
 */


async function runUS036TC01() {
    console.dir('Pozitive->GET [ADMIN=TRUE],[ID=NONE]',{depth: null, colors: true});
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

    // 2. Token ile GET isteği at
    const getResponse = await axios.request({
        method: 'get',
        url: 'https://qa.instulearn.com/api/blogs',
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

runUS036TC01().catch(console.error);
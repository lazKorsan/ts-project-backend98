import axios from 'axios';
import assert from "node:assert/strict";

/*
 Desciption:Bir yönetici olarak API bağlantısı üzerinden yeni bir blog kaydı olusturabilmek istiyorum.
 Acceptance Criterias:
 /api/blog/{id} endpoint'ine
 gecerli authorization bilgileri ve
 kaydı olmayan bir (id) iceren bir
 GET request gönderildiginde
 dönen status code'in 203,
 response body'deki remark bilgisinin "failed" ve
 message bilgisinin de "There is not blog for this id." oldugu
 */


async function runUS037TC03A2() {
    console.dir('Negative->GET [ADMIN=TRUE],[ID=FALSE]');
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
    //console.dir(getResponse.data, {depth: null, colors: true});

    assert.strictEqual(getResponse.status, 200, "Status code 200 değil!");
    console.dir('✅ Status Code 200 doğrulandı.');

    assert.strictEqual(getResponse.data.remark, 'success', "Remark 'success' değil!");
    console.dir('✅ Remark "success" doğrulandı.');


    const nonExistingID = await axios.request({
        method: 'get',
        url: `https://qa.instulearn.com/api/blog/1`,
        headers: {
            'Accept': 'application/json',
            'x-api-key': '1234',
            'Authorization': `Bearer ${token}`
        }
    });


    console.log('Aralıkta olmayan veya silinmis ID icin donen yanit');
    console.dir('='.repeat(64));
    console.log(nonExistingID.data);
    console.dir('='.repeat(64));

    assert.strictEqual(nonExistingID.data.remark, 'failed', " 'Remark' bilgisi 'failed degil'");
    console.dir('✅ Remark bilgisinin failed oldugu dogrulandi');

    assert.strictEqual(nonExistingID.data.status, 203, "'status' degeri 203 degil");
    console.dir('✅ status 203 dogrulandi');

    assert.strictEqual(nonExistingID.data.data.message, 'There is not blog for this id.', "'message' bilgisi 'There is not blog for this id.' degil");
    console.dir('✅ message bilgisi dogrulandi')


}

runUS037TC03A2().catch(console.error);
import axios from 'axios';
import assert from "node:assert/strict";

/*
 Desciption:Bir yönetici olarak API bağlantısı üzerinden yeni bir blog kaydı olusturabilmek istiyorum.
 Acceptance Criterias:
 id(x) olaninin response body'de donen bilgileri
 (category_id, author_id, slug, image, visit_count, enable_comment, status, created_at, updated_at, comments_count) doğrulanmalı.
 */


async function runUS037TC03() {
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


    const nonId = await axios.request({
        method: 'get',
        url: `https://qa.instulearn.com/api/blog/`,
        headers: {
            'Accept': 'application/json',
            'x-api-key': '1234',
            'Authorization': `Bearer ${token}`
        }
    });


    console.log(nonId.data);

    assert.strictEqual(nonId.data.remark, 'failed', " 'Remark' bilgisi 'failed degil'");
    console.dir('✅ Remark bilgisinin failed oldugu dogrulandi');

    assert.strictEqual(nonId.data.status, 203, "'status' degeri 203 degil");
    console.dir('✅ status 203 dogrulandi');

    assert.strictEqual(nonId.data.data.message, 'No id', "'message' bilgisi 'No id' degil");
    console.dir('✅ message bilgisi dogrulandi')


}

runUS037TC03().catch(console.error);
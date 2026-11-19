import axios from 'axios';
import assert from "node:assert/strict";

/*
 Desciption:Bir yönetici olarak API bağlantısı üzerinden yeni bir blog kaydı olusturabilmek istiyorum.
 Acceptance Criterias:
 id(x) olaninin response body'de donen bilgileri
 (category_id, author_id, slug, image, visit_count, enable_comment, status, created_at, updated_at, comments_count) doğrulanmalı.
 */


async function runUS037TC01() {
    console.dir('Pozitive->GET [ADMIN=TRUE],[ID=NONE]', {depth: null, colors: true});
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
    console.dir('   ✅ Status Code 200 doğrulandı.');

    assert.strictEqual(getResponse.data.remark, 'success', "Remark 'success' değil!");
    console.dir('   ✅ Remark "success" doğrulandı.');

    const blogs = getResponse.data.data.blog || [];

    const idList = blogs.map((blog: any) => Number(blog.id))
        .filter((id: number) => !isNaN(id));

    console.log(idList);

    const minID = Math.min(...idList);
    console.log(minID);

    const getMinId = await axios.request({
        method: 'get',
        url: `https://qa.instulearn.com/api/blog/${minID}`,
        headers: {
            'Accept': 'application/json',
            'x-api-key': '1234',
            'Authorization': `Bearer ${token}`
        }
    });

    console.log(getMinId);

    assert.strictEqual(getResponse.status, 200, "Status code 200 değil!");
    console.dir('   ✅ Status Code 200 doğrulandı.');

    assert.strictEqual(getResponse.data.remark, 'success', "Remark 'success' değil!");
    console.dir('✅ Remark "success" doğrulandı.');

    assert.strictEqual(getMinId.data.data.id, 23, 'id degeri 23 degil');
    console.log('✅ data id degeri dogrulandi');

    console.assert(getMinId.data.data.id === 23, 'id degeri 23 degil');

    assert.strictEqual(getMinId.data.data.category_id, 34, 'category_id degeri 34 degil');
    console.log('✅ category_id degeri dogrulandi');

    assert.strictEqual(getMinId.data.data.translations[0].locale, 'en', 'translation id degeri dogrulandi' );
    console.log('✅ translations degeri dogrulandi');


}

runUS037TC01().catch(console.error);
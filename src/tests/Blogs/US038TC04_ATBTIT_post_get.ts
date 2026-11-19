import axios from 'axios';
import assert from "node:assert/strict";

/*
 Desciption:Bir yönetici olarak API bağlantısı üzerinden yeni bir blog kaydı olusturabilmek istiyorum
 Acceptance Criterias:
API uzerinden olusturulmak istenen yeni blog kaydinin olustugu API uzerinden dogrulanmali.
(Response bodyde dönen Added Blog ID ile /api/blog/{id} endpoint'ine GET request gönderilerek kayıt oluşturulduğu doğrulanabilir.)
 */


async function runUS038TC04() {
    console.dir('Pozitive->POST [ADMIN=TRUE],[BODY=TRUE],[ID=NONE]');
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


    const postResponse = await axios.request({
        method: 'post',
        url: 'https://qa.instulearn.com/api/addBlog',
        headers: {
            'Accept': 'application/json',
            'x-api-key': '1234',
            'Authorization': `Bearer ${token}`
        },
        data: {
            title: 'Test Blogs API melingojgej',
            category_id: 132,
            description: 'Online Education Melingojgej',
            content: 'video and downloadeble files Melingojgej'
        }
    })

    console.dir(postResponse.data);

    console.log('Eklenen Blog ID:', postResponse.data["Added Blog ID"]);


    // 3. Assertions
    assert.equal(postResponse.status, 200);
    assert.equal(postResponse.data.remark, 'success');
    assert.equal(postResponse.data.Message, 'Successfully Added.');

    console.dir('✅ Tüm testler geçti ');

    const addedBlogID = postResponse.data["Added Blog ID"];


    // burasi get sorgusu icin matıkli bri isim bulamadığım için getAddedBlogID
    const getAddedBlogIDResponse = await axios({
        method: 'get',
        url: `https://qa.instulearn.com/api/blog/${addedBlogID}`,
        headers: {
            'Accept': 'application/json',
            'x-api-key': '1234',
            'Authorization': `Bearer ${token}`
        }
    })

    console.log(getAddedBlogIDResponse);

    assert.strictEqual(getAddedBlogIDResponse.data.status, 200);
    assert.strictEqual(getAddedBlogIDResponse.data.remark, 'success');

    // get sorgusundan donen id ile eklenen id numaralarinın eşit oldugunu assert etmek istiyorum
    assert.equal(getAddedBlogIDResponse.data.data.id, addedBlogID);
    console.dir('✅ Tüm testler geçti ');


}

runUS038TC04().catch(console.error);
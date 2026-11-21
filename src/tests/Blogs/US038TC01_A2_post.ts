import axios from 'axios';
import assert from "node:assert/strict";
import {Config} from "../../../Config";

/*
 Desciption:Bir yönetici olarak API bağlantısı üzerinden yeni bir blog kaydı olusturabilmek istiyorum
 Acceptance Criterias:
/api/addBlog endpoint'ine gecerli authorization bilgileri ve
dogru datalar (title, category_id, description, content) iceren bir
POST body gönderildiginde dönen
status code'in 200,
response body'deki remark bilgisinin "success" ve
Message bilgisinin de "Successfully Added." oldugu dogrulanmali.
 */


async function runUS038TC01A2() {
    console.dir('Pozitive->GET [ADMIN=TRUE],[ID=NONE]', {depth: null, colors: true});
    // 1. Token al
    const tokenResponse = await axios.request({
        method: 'post',
        url: 'https://qa.instulearn.com/api/token',
        headers: {
            'Accept': 'application/json',
            'x-api-key': Config.apiKey,
        },
        data: {
            email: Config.adminEmail,
            password: Config.adminPassword
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
    console.dir(postResponse.data["Added Blog ID"]);

    // 3. Assertions
    assert.equal(postResponse.status, 200);
    assert.equal(postResponse.data.remark, 'success');
    assert.equal(postResponse.data.Message, 'Successfully Added.');

    console.dir('✅ Tüm testler geçti ');





}

runUS038TC01A2().catch(console.error);
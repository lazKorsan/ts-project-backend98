import axios from 'axios';
import assert from "node:assert/strict";

/*
 Desciption:Bir yönetici olarak API bağlantısı üzerinden yeni bir blog kaydı olusturabilmek istiyorum
 Acceptance Criterias:
/api/addBlog endpoint'ine
gecersiz (invalid token) authorization bilgileri ile
dogru datalar (title, category_id, description, content) iceren
bir POST body gönderildiginde
dönen status code'in 401 oldugu ve
response body'deki message bilgisinin "Unauthenticated." oldugu dogrulanmali
 */


async function runUS038TC02() {
    console.dir('Negative->POST [ADMIN=FALSE],[BODY=EMPTY][ID=NONE]', {depth: null, colors: true});
    // 1. Token al



    // todo negative testlerde try-catch blogu zorunlu
    try {
        const postResponse = await axios.request({
            method: 'post',
            url: 'https://qa.instulearn.com/api/addBlog',
            headers: {
                'Accept': 'application/json',
                'x-api-key': '1234',

            },
            // data kısmını bos birakiyoruz.
        })

        console.dir(postResponse.data);

    } catch (error) {

        if (!axios.isAxiosError(error)) {
            throw error; // Axios hatası değilse yeniden fırlatın
        }

        const status = error.response?.status;
        const message = error.response?.data?.message;

        console.log('Status :', status);
        console.log('Message:', message);

        assert.strictEqual(status, 401, "Status code 401 değil!");
        console.log('   ✅ Status Code 401 doğrulandı.');

        assert.strictEqual(message, 'Unauthenticated.', "message: 'The title field is required. (and 3 more errors)' değil!");
        console.log('   ✅ message "Unauthenticated." doğrulandı.');
    }


}

runUS038TC02().catch(console.error);
import axios from 'axios';
import assert from "node:assert/strict";

/*
 Desciption:Bir yönetici olarak API bağlantısı üzerinden yeni bir blog kaydı olusturabilmek istiyorum
 Acceptance Criterias:
/api/addBlog endpoint'ine
gecerli authorization bilgileri ve
data icermeyen bir POST request gönderildiginde
dönen status code'in 422 oldugu ve
response body'deki message bilgisinin "The title field is required. (and 3 more errors)" oldugu dogrulanmali
 */


async function runUS038TC02() {
    console.dir('Negative->POST [ADMIN=TRUE],[BODY=EMPTY][ID=NONE]', {depth: null, colors: true});
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


    // todo negative testlerde try-catch blogu zorunlu
    try {
        const postResponse = await axios.request({
            method: 'post',
            url: 'https://qa.instulearn.com/api/addBlog',
            headers: {
                'Accept': 'application/json',
                'x-api-key': '1234',
                'Authorization': `Bearer ${token}`
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

        assert.strictEqual(status, 422, "Status code 401 değil!");
        console.log('   ✅ Status Code 401 doğrulandı.');

        assert.strictEqual(message, 'The title field is required. (and 3 more errors)', "message: 'The title field is required. (and 3 more errors)' değil!");
        console.log('   ✅ message "Unauthenticated." doğrulandı.');
    }


}

runUS038TC02().catch(console.error);
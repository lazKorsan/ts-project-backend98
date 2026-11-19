import axios from 'axios';
import assert from "node:assert/strict";

/*
 Description: Bir yönetici olarak API bağlantısı üzerinden yeni bir blog kaydı oluşturabilmek istiyorum.
 Acceptance Criterias:
 /api/blogs endpoint'ine
 geçersiz (invalid token) authorization bilgileri ile
 bir GET request gönderildiğinde dönen
 status code'in 401 ve
 response body'deki message bilgisinin "Unauthenticated." olduğu doğrulanmalı.
*/

async function runUS036TC03() {
    console.log('Negative -> GET [ADMIN=FALSE], [ID=NONE]');

    try {
     await axios.request({
            method: 'get',
            url: 'https://qa.instulearn.com/api/blogs',
            headers: {
                'Accept': 'application/json',
                'x-api-key': '1234'
            }
        });


        assert.fail('401 beklendi fakat 2xx response geldi!');

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

        assert.strictEqual(message, 'Unauthenticated.', "message: 'Unauthenticated.' değil!");
        console.log('   ✅ message "Unauthenticated." doğrulandı.');
    }




}

runUS036TC03().catch(console.error);
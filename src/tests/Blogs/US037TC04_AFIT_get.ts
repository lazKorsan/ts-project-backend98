import axios from 'axios';
import assert from "node:assert/strict";

/*
 Description: Bir yönetici olarak API bağlantısı üzerinden yeni bir blog kaydı oluşturabilmek istiyorum.
 Acceptance Criterias:
/api/blog/{id} endpoint'ine
gecersiz (invalid token) authorization bilgileri ve
dogru data (id) iceren bir GET request gönderildiginde
dönen status code'in 401 ve
response body'deki message bilgisinin "Unauthenticated." oldugu dogrulanmali
*/

async function runUS037TC04() {
    console.log('Negative -> GET [ADMIN=FALSE], [ID=TRUE]');

    try {
        await axios.request({
            method: 'get',
            url: 'https://qa.instulearn.com/api/blog/23',
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

runUS037TC04().catch(console.error);
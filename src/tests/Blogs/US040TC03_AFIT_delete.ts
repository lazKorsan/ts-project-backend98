import axios from 'axios';
import assert from "node:assert/strict";

/*
 Desciption: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip blog bilgilerini silebilmek istiyorum.
 Acceptance Criterias:
 /api/deleteBlog/{id} endpoint'ine
gecersiz (invalid token) authorization bilgileri ile
dogru (id) iceren bir DELETE request gönderildiginde
dönen status code'in 401 oldugu ve
response body'deki message bilgisinin "Unauthenticated." oldugu dogrulanmali
 */


async function US040TC03() {
    console.dir('TestinKisaTanimi',);


    try {
        await axios.request({
            method: 'delete',
            url: 'https://qa.instulearn.com/api/deleteBlog/1',
            headers: {
                'Accept': 'application/json',
                'x-api-key': '1234'
            }
            // token yok
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

US040TC03().catch(console.error);
import axios from 'axios';
import assert from "node:assert/strict";

/*
 Desciption: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip blog'un bilgilerini güncelleyebilmek istiyorum.
 Acceptance Criterias:
/api/updateBlog/{id} endpoint'ine
gecersiz (invalid token) authorization bilgileri ile
dogru (id) ve dogru datalar (title, category_id, description, content) iceren
bir PATCH body gönderildiginde
dönen status code'in 401 oldugu ve
response body'deki message bilgisinin "Unauthenticated." oldugu dogrulanmali
 */


async function run039TC04() {
    console.dir('TestinKisaTanimi',);
    // 1. Token al


    // todo negative testlerde try-catch blogu zorunlu
    try {
        const postResponse = await axios.request({
            method: 'patch',
            url: 'https://qa.instulearn.com/api/updateBlog/1',
            headers: {
                'Accept': 'application/json',
                'x-api-key': '1234',

            },
            data: {
                title: 'OnlineEducation Blogs Info',
                category_id: 132,
                description: 'Any software Language',
                content: 'video, downloadable files, face to face meeting'
            }
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

        assert.strictEqual(status, 401);
        assert.strictEqual(error.response?.data?.message, 'Unauthenticated.' );
        console.log('Tum Patch testleri gecti');


    }


}

run039TC04().catch(console.error);
import axios from 'axios';
import assert from "node:assert/strict";

/*
 Desciption: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip blog'un bilgilerini güncelleyebilmek istiyorum.
 Acceptance Criterias:
 /api/updateBlog/{id} endpoint'ine
gecerli authorization bilgileri ile
dogru (id) ve data icermeyen
bir PATCH request gönderildiginde
dönen status code'in 203,
response body'deki remark bilgisinin "failed" ve
message bilgisinin de "There is no information to update." oldugu dogrulanmali.
 */


async function runUS039TC02() {
    console.dir('TestinKisaTanimi',);
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
    console.log(tokenResponse.data);

    assert.strictEqual(tokenResponse.status, 200);
    assert.strictEqual(tokenResponse.data.data.token_type, 'Bearer');
    console.log('Tum token testleri gecti')

    console.dir('Get testi basliyor')

    const getResponse = await axios({
        method: 'get',
        url: 'https://qa.instulearn.com/api/blogs',
        headers: {
            'Accept': 'application/json',
            'x-api-key': '1234',
            'Authorization': `Bearer ${token}`
        }
    });
    // console.dir(getResponse.data, {depth: null, colors: true});

    const blogs = getResponse.data.data.blog || [];

    const idList = blogs.map((blog: any) => Number(blog.id))
        .filter((id: number) => !isNaN(id));

    const maxID = Math.max(...idList);
    //const nonExistingID=maxID+5;
    console.log(maxID);


    // patch testi baslıyor
    console.dir('PATCH testi basliyor');

    const patchRequest = await axios({
        method: 'patch',
        url: `https://qa.instulearn.com/api/updateBlog/${maxID}`,
        headers: {
            'Accept': 'application/json',
            'x-api-key': '1234',
            'Authorization': `Bearer ${token}`
        },

    });


    console.log(patchRequest.data);

    assert.strictEqual(patchRequest.data.status, 203);
    assert.strictEqual(patchRequest.data.remark, 'failed');
    assert.strictEqual(patchRequest.data.message, 'There is no information to update.');


    console.log('Tum Patch testleri gecti');


}

runUS039TC02().catch(console.error);
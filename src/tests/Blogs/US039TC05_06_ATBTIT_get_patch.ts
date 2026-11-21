import axios from 'axios';
import assert from "node:assert/strict";

/*
 Desciption: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip blog'un bilgilerini güncelleyebilmek istiyorum.
 Acceptance Criterias:
/api/updateBlog/{id} endpoint'inden donen response body icindeki Updated Blog Id bilgisinin
 /api/updateBlog/{id} endpoint'inde yazan id path parametresi ile ayni oldugu dogrulanmali.
 */


async function run039TC05() {
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
    //console.dir(getResponse.data, {depth: null, colors: true});

    const blogs = getResponse.data.data.blog || [];

    const idList = blogs.map((blog: any) => Number(blog.id))
        .filter((id: number) => !isNaN(id));

    const maxID = Math.max(...idList);
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
        data: {
            title: 'OnlineEducation Blogs Info',
            category_id: 132,
            description: 'Any software Language',
            content: 'video, downloadable files, face to face meeting'
        }
    });


    console.log('--- PATCH Response ---');
    console.log(JSON.stringify(patchRequest.data, null, 2));


    assert.strictEqual(patchRequest.status, 200);
    assert.strictEqual(patchRequest.data.remark, 'success');
    assert.strictEqual(patchRequest.data.Message, 'Successfully Updated.');


    const returnedID = patchRequest.data['Updated Blog Id'];

    assert.strictEqual(returnedID, maxID);


    console.log(
        `✅ PATCH OK — gönderilen ID: ${maxID}, dönen ID: ${returnedID} (eşleşti)`
    );

    console.log('✅ Tüm PATCH testleri geçti');


}

run039TC05().catch(console.error);
import axios from 'axios';
import assert from "node:assert/strict";

/*
 Desciption:Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip blog'un bilgilerini güncelleyebilmek istiyorum.
 Acceptance Criterias:
 /api/updateBlog/{id} endpoint'ine gecerli authorization bilgileri ile
kaydı olmayan bir (id) ve
dogru datalar (title, category_id, description, content) iceren bir PATCH body gönderildiginde
dönen status code'in 203,
response body'deki remark bilgisinin "failed" ve
message bilgisinin de "There is not blog for this id." oldugu dogrulanmali;

 */


async function run039TC03A1() {
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
    const nonExistingID = maxID + 5;
    console.log(maxID);


    // patch testi baslıyor
    console.dir('PATCH testi basliyor');

    const patchRequest = await axios({
        method: 'patch',
        url: `https://qa.instulearn.com/api/updateBlog/${nonExistingID}`,
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


    console.log(patchRequest.data);

    assert.strictEqual(patchRequest.status, 203);
    assert.strictEqual(patchRequest.data.remark, 'failed');
    assert.strictEqual(patchRequest.data.data.message, 'There is not blog for this id.');
    console.log('Tum Patch testleri gecti');


}

run039TC03A1().catch(console.error);
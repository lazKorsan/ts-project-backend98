import axios from 'axios';
import assert from "node:assert/strict";

/*
 Desciption: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip blog bilgilerini silebilmek istiyorum.
 Acceptance Criterias:
/api/deleteBlog/{id} endpoint'ine
gecerli authorization bilgileri ve
kaydı olmayan bir (id) iceren
bir DELETE request gönderildiginde
dönen status code'in 203,
response body'deki remark bilgisinin "failed" ve
message bilgisinin de "There is not blog for this id." oldugu dogrulanmali
 */


async function runUS040TC02A1() {
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

    console.dir('Get testi basliyor');

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
    const nonExistingBlogsID = maxID + 5;

    console.log('Delete Testleri basliyor');

    const deleteResponse = await axios({
        method: 'delete',
        url: `https://qa.instulearn.com/api/deleteBlog/${nonExistingBlogsID}`,
        headers: {
            'Accept': 'application/json',
            'x-api-key': '1234',
            'Authorization': `Bearer ${token}`
        }
    });

    console.dir(deleteResponse.data, {depth: null, colors: true});

    assert.strictEqual(deleteResponse.status, 203);
    assert.strictEqual(deleteResponse.data.remark, 'failed');
    assert.strictEqual(deleteResponse.data.data.message, 'There is not blog for this id.');


    console.log('✅ Tüm DELETE testleri geçti');


}

runUS040TC02A1().catch(console.error);
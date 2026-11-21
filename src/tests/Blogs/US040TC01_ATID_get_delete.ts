import axios from 'axios';
import assert from "node:assert/strict";

/*
 Desciption: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip blog bilgilerini silebilmek istiyorum.
 Acceptance Criterias:
/api/deleteBlog/{id} endpoint'ine
gecerli authorization bilgileri ve
dogru (id) iceren bir DELETE request gönderildiginde
dönen status code'in 200,
response body'deki remark bilgisinin "success" ve
Message bilgisinin de "Successfully Deleted." oldugu dogrulanmali.
 */


async function runXyzt() {
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
    console.log('Tum token testleri gecti');

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
    console.dir(getResponse.data, {depth: null, colors: true});

    const blogs = getResponse.data.data.blog || [];

    const idList = blogs.map((blog: any) => Number(blog.id))
        .filter((id: number) => !isNaN(id));

    const maxID = Math.max(...idList);
    console.log(maxID);

    console.log('Delete Testleri basliyor');

    const deleteResponse = await axios({
        method: 'delete',
        url: `https://qa.instulearn.com/api/deleteBlog/${maxID}`,
        headers: {
            'Accept': 'application/json',
            'x-api-key': '1234',
            'Authorization': `Bearer ${token}`
        }
    });

    console.log(JSON.stringify(deleteResponse.data, null, 2));

    assert.strictEqual(deleteResponse.status, 200);
    assert.strictEqual(deleteResponse.data.remark, 'success');
    assert.strictEqual(deleteResponse.data.Message, 'Successfully Deleted.');



    console.log(`Silinen Blog ID numarasi : ${deleteResponse.data["Deleted Blog Id"]}`);

    const deletedBlogID = deleteResponse.data["Deleted Blog Id"];

    assert.strictEqual(deletedBlogID, maxID);

    console.log(
        `✅ PATCH OK — gönderilen ID: ${maxID}, silinen ID: ${deletedBlogID} (eşleşti)`
    );

    console.log('✅ Tüm DELETE testleri geçti');






}

runXyzt().catch(console.error);
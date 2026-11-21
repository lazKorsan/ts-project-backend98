import axios from 'axios';
import assert from "node:assert/strict";

/*
 Desciption: Bir yönetici olarak API baglantisi üzerinden belirtilen id numarasına sahip blog bilgilerini silebilmek istiyorum.
 Acceptance Criterias:
/api/deleteBlog/{id} endpoint'inden donen response body icindeki Deleted Blog Id bilgisinin /api/deleteBlog/{id} endpoint'inde yazan id path parametresi ile ayni oldugu dogrulanmali.
API uzerinden silinmek istenen blog kaydinin silindigi, API uzerinden dogrulanmali.
(Response body'de dönen Deleted Blog Id ile /api/blog/{id} endpoint'ine GET request gönderilerek kaydın silindiği doğrulanabilir.)
 */


async function US040TC0405() {
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

US040TC0405().catch(console.error);
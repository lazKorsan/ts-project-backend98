const axios = require('axios');
import assert from "node:assert/strict";

async function runDataParcingBlogs() {
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

    // 2. Token ile GET isteği at
    const getResponse = await axios.request({
        method: 'get',
        url: 'https://qa.instulearn.com/api/blogs',
        headers: {
            'Accept': 'application/json',
            'x-api-key': '1234',
            'Authorization': `Bearer ${token}`
        }
    });
    console.dir(getResponse.data, {depth: null, colors: true});

    assert.strictEqual(getResponse.status, 200, "Status code 200 değil!");
    console.dir('   ✅ Status Code 200 doğrulandı.');

    assert.strictEqual(getResponse.data.remark, 'success', "Remark 'success' değil!");
    console.dir('   ✅ Remark "success" doğrulandı.');

    // id numaralarini listelemek
    const blogs = getResponse.data.data.blog || [];

    // id numarlaroını listelemek
    blogs.forEach((plan: any, index: number) => {
        console.dir(`  [${index}] id: ${plan.id}`, {depth: null, colors: true});
    });

    // maxID ve minId almak
    const idList = blogs.map((blog: any) => Number(blog.id))
        .filter((id: number) => !isNaN(id));
    if (idList.length > 0) {
        const minID = Math.max(...idList);
        const maxID = Math.max(...idList);
        console.dir(`✅  Max ID: "${maxID}"`, {depth: null, colors: true});
        console.dir(`✅ MinID:  "${minID}"`, {depth: null, colors: true});
    }


}

runDataParcingBlogs().catch(console.error);
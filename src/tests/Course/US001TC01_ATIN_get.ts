import {Template} from "../../../Template";
import axios from "axios";
import assert from "node:assert/strict";

async function US001TC01() {

    console.log('Courses Get Test basliyor');

    const rawPath = Template.baseUrl +'/'+ 'api/courses';
    const rawPath2=`${Template.baseUrl}/api/courses`;

    const getResponse = await axios.request({
        method: 'get',
        url: rawPath2,
        headers: {
            'Accept': Template.accept,
            'x-api-key': Template.apiKey,
            'Authorization': Template.token
        },

        validateStatus: (status) => status < 500 // 401 dahil tüm 4xx'leri error saymaz

    });


    console.dir(getResponse.data);


    assert.strictEqual(getResponse.status, 200, 'HTTP status 200 olmalı');


    assert.strictEqual(getResponse.data.status, 200, 'Body status 200 olmalı');

    assert.strictEqual(getResponse.data.status, 200);
    console.log('✅  Courses Status Testi Gecti');

    assert.strictEqual(getResponse.data.remark, 'success');
    console.log('✅  Courses Remark Testi Gecti');

    console.log('✅  Coursess Get Testleri Gecti');


    const idList = await getResponse.data.AddedCourseID.webinars.map((item: { id: any; }) => item.id);
    console.dir(idList);

    const minID = Math.min(...idList);
    console.log(' ✅✅  Minimum ID degeri: ', minID);
    const maxID = Math.max(...idList);
    console.log(' ✅✅  Maximum ID degeri: ', maxID);


}

US001TC01().catch((err) => {
    console.error(err);
    process.exit(1);
});
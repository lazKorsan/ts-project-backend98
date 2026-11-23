/*
Description:
Acceptance Criterias:
id(x) olaninin
response body'de donen bilgileri (teacher_id, creator_id, category_id, type, private, slug, start_date, duration, timezone) doğrulanmalı.
 */


import axios from 'axios';
import assert from "node:assert/strict";
import {Template} from "../../../Template";


async function US001TC02_ATID_get() {

    const getResponse = await axios({
        method: 'get',
        url: `${Template.baseUrl}/api/courses`,
        headers: {
            'Accept': Template.accept,
            'x-api-key': Template.apiKey,
            'Authorization': Template.token
        },
        validateStatus: (status) => status < 500 // 401 dahil tüm 4xx'leri error saymaz
    })

    console.log(getResponse.data);

    assert.strictEqual(getResponse.data.remark, 'success');
    console.log(' ✅  Remark Testi geçti');

    assert.strictEqual(getResponse.data.status, 200);
    console.log(' ✅  Status Testi geçti');

    const idList= await getResponse.data.AddedCourseID.webinars.map((item: { id: number; })=>item.id);
    const minID=Math.min(...idList);
    console.log('Courses Modul minID degeri: ', minID);

    // minId degerine get sorgusu cekelim
    const responseMinID= await axios.request({
        method: 'get',
        url: `${Template.baseUrl}/api/course/${minID}`,
        headers: {
            'Accept': Template.accept,
            'x-api-key': Template.apiKey,
            'Authorization': Template.token  // deepseek buray token koymalımıyım
        },
        validateStatus: (status) => status < 500 // 401 dahil tüm 4xx'leri error saymaz
    });

    console.dir(responseMinID.data, { depth: null });




}

US001TC02_ATID_get().catch((err) => {
    console.error(err);
    process.exit(1);
});
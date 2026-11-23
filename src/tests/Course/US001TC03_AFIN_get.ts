/*
Description:
Acceptance Criterias:
/api/courses endpoint'ine
gecersiz (invalid token) authorization bilgileri ile
bir GET request gönderildiginde
dönen status code'in 401 ve
response body'deki message bilgisinin "Unauthenticated." oldugu dogrulanmali.
 */


import axios from "axios";
import {Template} from "../../../Template";
import assert from "node:assert/strict";


async function US001TC02_ATID_get() {

    const negativeGetResponse= await axios.request({
        method: 'get',
        url: `${Template.baseUrl}/api/courses`,
        headers: {
            'Accept': Template.accept,
            'x-api-key': Template.apiKey,
            'Authorization': Template.invalid
        },
        validateStatus: (status) => status < 500
    })

    console.log(negativeGetResponse.data);

    assert.strictEqual(negativeGetResponse.status, 401);

    assert.strictEqual(negativeGetResponse.data.message, 'Unauthenticated.');








}

US001TC02_ATID_get().catch((err) => {
    console.error(err);
    process.exit(1);
});
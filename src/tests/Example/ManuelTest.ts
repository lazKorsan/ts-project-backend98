import axios from "axios";
import {Template} from "../../../Template";
import assert from "node:assert/strict";


async function US096TC01() {

    const getResponse = await axios.request({

        method: 'get',
        url: `${Template.baseUrl}/api/pricePlans`,
        headers: {
            'Accept': 'application/json',
            'x-api-key': Template.apiKey,
            'Authorization': Template.token
        }
    });

    console.log(getResponse.data);

    assert.strictEqual(getResponse.data.status, 200);
    console.dir('Status testi geçti');

    assert.strictEqual(getResponse.data.remark, 'success');
    console.dir('Reamrk testi gecti');


}

US096TC01().catch(console.error);





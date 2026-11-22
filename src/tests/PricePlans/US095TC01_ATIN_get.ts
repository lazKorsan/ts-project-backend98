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

    const idList= getResponse.data.data.map((item: { id: any; }) => item.id);
    console.dir(idList);

    const minID=Math.min(...idList);
    console.log('Minimum ID degeri: ', minID);

    const maxID=Math.max(...idList);
    console.log('Maximum ID degeri: ', maxID);


    const getItem = await axios.request({


        method: 'get',
        url: `${Template.baseUrl}/api/pricePlan/${minID}`,
        headers: {
            'Accept': 'application/json',
            'x-api-key': Template.apiKey,
            'Authorization': Template.token
        }
    })

    console.dir(getItem.data);

    assert.strictEqual(getItem.data.remark, 'success');
    assert.strictEqual(getItem.data.status, 200);

    console.dir('🌏 MinimumID  testleri geçti');












}

US096TC01().catch(console.error);





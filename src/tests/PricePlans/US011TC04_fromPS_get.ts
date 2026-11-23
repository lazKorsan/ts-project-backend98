import axios from 'axios';
import assert from "node:assert/strict";


axios.request(
    {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://qa.instulearn.com/api/pricePlan/1583',
        headers: {
            'x-api-key': '1234',
            'Accept': 'application/json',
            'Authorization': 'Bearer 34510|yDrNx0Ld71BJAz7BEPQjYQ7R8TAGDY0IzpsX61CU',
        },
        validateStatus: (status) => status < 500
    }
).then((response: { data: any; }) => {
    console.log(JSON.stringify(response.data));
    assert.strictEqual(response.data.status, 200);

})





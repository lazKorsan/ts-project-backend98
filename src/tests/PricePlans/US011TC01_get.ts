import axios from 'axios';
import {Config} from "../../../Config";
import {Template} from "../../../Template";


let config = {
    method: 'get',

    url: `${Template.baseUrl}/api/pricePlans`,
    headers: {
        'x-api-key': Config.apiKey,
        'Accept': Config.accept,
        'Authorization': Config.token
    }
};



axios.request(config)
    .then(response => {
        console.dir(response.data)

        // Status code 200 mi?
        assert.strictEqual(response.status, 200);

        // Response data null değil mi?
        assert.ok(response.data, 'Response data boş olmamalı');

        // data alanı array mi?
        assert.ok(Array.isArray(response.data.data), 'data bir array olmalı');

        // data dizisi boş değil mi?
        assert.ok(response.data.data.length > 0, 'data dizisi boş olmamalı');

        console.log('Butun assertler geçti')


    })
    .catch((error) => {
        console.log(error);
    });














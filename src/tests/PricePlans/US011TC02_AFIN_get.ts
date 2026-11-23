import axios from 'axios';
import assert from "node:assert/strict";
import {Template} from "../../../Template";

axios.request({
    method: 'get',
    url: 'https://qa.instulearn.com/api/pricePlans',
    headers: {
        'x-api-key': Template.apiKey,
        'Accept': Template.accept,
        'Authorization': Template.invalid
    },
    validateStatus: (status) => status < 500 // 401 dahil tüm 4xx'leri error saymaz
})
    .then(response => {
        console.log('Status:', response.status);
        console.log('Body:', response.data);

        // Assert: 401 bekliyoruz
        assert.strictEqual(response.status, 401);
        console.log('Status testi gecti');
        assert.strictEqual(response.data.message, 'Unauthenticated.');
        console.log('message test gecti');
        console.log('Butun testler gecti');
    })
    .catch((error) => {
        console.log('Beklenmeyen hata:', error);
    });

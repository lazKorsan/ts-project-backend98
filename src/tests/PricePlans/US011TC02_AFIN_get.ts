import axios from 'axios';
import {Config} from "../../../Config";

axios.request({
    method: 'get',
    url: 'https://qa.instulearn.com/api/pricePlans',
    headers: {
        'x-api-key': Config.apiKey,
        'Accept': Config.accept
        // Authorization kasıtlı olarak yok
    },
    validateStatus: (status) => status < 500 // 401 dahil tüm 4xx'leri error saymaz
})
    .then(response => {
        console.log('Status:', response.status);
        console.log('Body:', response.data);

        // Assert: 401 bekliyoruz
        assert.strictEqual(response.status, 401);
        assert.strictEqual(response.data.message, 'Unauthenticated.');
    })
    .catch((error) => {
        console.log('Beklenmeyen hata:', error);
    });

import axios from "axios";
import 'dotenv/config';

const baseUrl= 'https://qa.instulearn.com';
test('US038TC01_ATIN_get', async () => {



    const tokenResponse = await axios.post(
        'https://qa.instulearn.com/api/token',
        {
            email: 'ahmet.admin@instulearn.com',
            password: 'Learn.123',
        },
        {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': '1234',
            },
        }
    );

    const token = tokenResponse.data.data.access_token;
    console.log('Alınan Token:', token);

    const response = await axios.get(`${baseUrl}/api/pricePlans`, {
        headers: {
            'Accept': 'application/json',
            'x-api-key': '1234',
            'Authorization': `Bearer ${token}`, // 'Bearer ' ve token arasında 1 boşluk olmalı
        },
    });

    console.log('Status Code:', response.status);
    console.log('Gelen Data:', JSON.stringify(response.data, null, 2));


});
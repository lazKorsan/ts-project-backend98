import axios from 'axios';
import 'dotenv/config';

async function runUS011TC01() {


    try {
        // 1. ADIM: Önce taze Admin Token al
        const tokenResponse = await axios.post(
            'https://qa.instulearn.com/api/token',
            {
                email: process.env.EMAIL || 'ahmet.admin@instulearn.com',
                password: process.env.PASSWORD || 'Learn.123',
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

        // 2. ADIM: Aldığın token ile US011TC01 GET isteğini at
        // (Endpoint URL'ini Postman'deki US011TC01_ATIT_get isteğinizle aynı yapın)
        const response = await axios.get('https://qa.instulearn.com/api/blogs', {
            headers: {
                'Accept': 'application/json',
                'x-api-key': '1234',
                'Authorization': `Bearer ${token}`, // 'Bearer ' ve token arasında 1 boşluk olmalı
            },
        });

        console.log('Status Code:', response.status);
        console.log('Gelen Data:', JSON.stringify(response.data, null, 2));

    } catch (error: any) {
        console.error('Hata Oluştu:');
        console.error('Status Code:', error.response?.status);
        console.error('Data:', error.response?.data || error.message);
    }
}

runUS011TC01();
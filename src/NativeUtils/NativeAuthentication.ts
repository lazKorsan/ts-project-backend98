import axios from 'axios';
import 'dotenv/config';

export class NativeAuthentication {
    /**
     * API'den taze bir admin token almak için kullanılır.
     * @returns {Promise<string>} Alınan access_token'ı döndürür.
     */
    public static async getAdminToken(): Promise<string> {
        try {
            const response = await axios.post(
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

            // Postman'deki response yapısına göre: response.data.data.access_token
            const token = response.data.data.access_token;
            return token;

        } catch (error: any) {
            console.error("Token alınırken hata oluştu!");
            console.error("Status:", error.response?.status);
            console.error("Data:", error.response?.data || error.message);
            throw error; // Hata fırlat ki çağıran taraf haberdar olsun
        }
    }
}
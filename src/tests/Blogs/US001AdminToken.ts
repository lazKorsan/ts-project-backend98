import axios, { AxiosResponse } from 'axios';

export class APIMethods {
    static async getRequest(endpoint: string, token: string): Promise<AxiosResponse> {
        return await axios.get(`${process.env.BASE_URL}${endpoint}`, {
            headers: {
                Accept: 'application/json',
                'x-api-key': process.env.API_KEY || '1234',
                Authorization: `Bearer ${token}`,
            },
            validateStatus: () => true,
        });
    }

    static async postRequest(endpoint: string, payload: object, token: string): Promise<AxiosResponse> {
        return await axios.post(`${process.env.BASE_URL}${endpoint}`, payload, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'x-api-key': process.env.API_KEY || '1234',
                Authorization: `Bearer ${token}`,
            },
            validateStatus: () => true,
        });
    }
}
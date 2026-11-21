import path from 'path';
import dotenv from 'dotenv';

// __dirname = .../NativeUtils klasörü
// '../.env' = proje kökündeki .env
// Bu dosya hep NativeUtils içinde olduğu için yol hiç değişmez!
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const Config = {
    baseUrl: (process.env.BASE_URL || '').replace(/\/$/, ''),
    apiKey: process.env.API_KEY || '1234',
    adminEmail: process.env.EMAIL || 'ahmet.admin@instulearn.com',
    adminPassword: process.env.PASSWORD || 'Learn.123',
    accept:'application/json',
    token:'Bearer 34510|yDrNx0Ld71BJAz7BEPQjYQ7R8TAGDY0IzpsX61CU',

};

// Debug için (opsiyonel)
if (!Config.baseUrl) {
    console.warn('⚠️ UYARI: BASE_URL .env dosyasında tanımlı değil!');
}
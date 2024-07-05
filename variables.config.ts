// Read from default ".env" file.
import dotenv from 'dotenv';
dotenv.config();

export const CONFIG = {
    // -----URL information
    baseHost: process.env.BASE_URL ?? 'https://practicesoftwaretesting.com/',
    baseApiHost: process.env.BASE_API_URL ?? 'https://api.practicesoftwaretesting.com/',
};
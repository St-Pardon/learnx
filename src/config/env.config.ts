import dotenv from 'dotenv';
dotenv.config();

export const PORT: string = process.env.PORT || '5000';
export const BASE_URI: string = process.env.BASE_URL || 'http://localhost:5000';
// export const ENV: string = process.env.ENV || 'dev';

// Database Config
export const DB_HOST: string = process.env.DB_HOST || 'localhost';
export const DB_USER: string = process.env.DB_USER || 'postgres';
export const DB_PASSWORD: string = process.env.DB_PASSWORD || '';
export const DB_NAME: string = process.env.DB_NAME || 'learnx';

// JWT Config
export const JWT_SECRET: string = process.env.JWT_SECRET || 'default'

// Email Config
export const EMAIL_USER: string = process.env.EMAIL_USER || ''
export const EMAIL_PASS: string = process.env.EMAIL_PASS || '';
export const EMAIL_SERVICE: string = process.env.EMAIL_SERVICE || 'Gmail';
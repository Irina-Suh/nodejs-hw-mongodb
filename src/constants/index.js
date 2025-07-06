import { getEnvVar } from "../utils/getEnvVar.js";


export const JWT_SECRET = getEnvVar('JWT_SECRET');
export const FIFTEEN_MINUTES  = 15 * 60; // 15 хв в секундах
export const REFRESH_EXPIRES_IN = 30 * 24 * 60 * 60; // 30 днів в секундах
export const SESSION_COOKIE_EXPIRES = 24 * 60 * 60 * 1000;// 24 години

export const SMTP = {
    SMTP_HOST: 'SMTP_HOST',
    SMTP_PORT: 'SMTP_PORT',
    SMTP_USER: 'SMTP_USER',
    SMTP_PASSWORD: 'SMTP_PASSWORD',
    SMTP_FROM: 'SMTP_FROM',
  };
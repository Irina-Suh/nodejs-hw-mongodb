import { getEnvVar } from "../utils/getEnvVar.js";


export const JWT_SECRET = getEnvVar('JWT_SECRET');
export const FIFTEEN_MINUTES  = 15 * 60; // 15 хв в секундах
export const REFRESH_EXPIRES_IN = 30 * 24 * 60 * 60; // 30 днів в секундах
export const SESSION_COOKIE_EXPIRES = 24 * 60 * 60 * 1000;// 24 години
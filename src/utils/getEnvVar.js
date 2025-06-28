import dotenv from 'dotenv';

dotenv.config();

export function getEnvVar(name, defaultValue) {
  const envVar = process.env[name];

  if (envVar) return envVar;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
}
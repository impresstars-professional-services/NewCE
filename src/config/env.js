import { ENV_VARS } from './constants';

export const validateEnv = () => {
  const missing = [];
  
  for (const [key, value] of Object.entries(ENV_VARS)) {
    if (!import.meta.env[value]) {
      missing.push(value);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n` +
      `${missing.join('\n')}\n\n` +
      `Please check your .env file and ensure all required variables are set.`
    );
  }
};

export const getEnvVar = (key) => {
  const value = import.meta.env[ENV_VARS[key]];
  if (!value) {
    throw new Error(`Environment variable ${ENV_VARS[key]} is not set`);
  }
  return value;
};
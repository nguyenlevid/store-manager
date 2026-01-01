/**
 * Environment Configuration
 *
 * Manages environment-specific variables based on NODE_ENV.
 * Add new environment variables here as the project grows.
 */

import 'dotenv/config';

type Environment = 'development' | 'production' | 'test';

const NODE_ENV = (process.env.NODE_ENV || 'development') as Environment;

/**
 * Environment-specific configuration
 */
const config = {
  development: {
    MONGODB_URI: process.env.MONGODB_URI_DEV || process.env.MONGODB_URI || '',
    PORT: parseInt(process.env.PORT || '3000', 10),
    LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  },
  production: {
    MONGODB_URI: process.env.MONGODB_URI_PROD || process.env.MONGODB_URI || '',
    PORT: parseInt(process.env.PORT || '8080', 10),
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
  },
  test: {
    MONGODB_URI: process.env.MONGODB_URI_TEST || process.env.MONGODB_URI || '',
    PORT: parseInt(process.env.PORT || '3001', 10),
    LOG_LEVEL: process.env.LOG_LEVEL || 'error',
  },
};

/**
 * Current environment configuration
 */
export const env = {
  NODE_ENV,
  ...config[NODE_ENV],

  // Environment checks
  isDevelopment: NODE_ENV === 'development',
  isProduction: NODE_ENV === 'production',
  isTest: NODE_ENV === 'test',
};

/**
 * Validate required environment variables
 */
export function validateEnv(): void {
  const required = ['MONGODB_URI'];

  const missing = required.filter((key) => !env[key as keyof typeof env]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
        `Current NODE_ENV: ${NODE_ENV}`,
    );
  }
}

// Log current environment on import
console.log(`[Environment] Running in ${NODE_ENV.toUpperCase()} mode`);

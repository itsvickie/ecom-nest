export interface EnvironmentVariablesInterface {
  NODE_ENV: 'test' | 'development';
  APP_PORT: string;
  DB_URL: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;
  MAIL_HOST: string;
  MAIL_PORT: number;
  MAIL_FROM: string;
  JWT_SECRET: string;
  ENV_STAGING_URL: string;
  ENV_PRODUCTION_URL: string;
}

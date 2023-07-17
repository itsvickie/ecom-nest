import * as Joi from 'joi';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';

import { EnvironmentVariablesService } from './environments-variables.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('test', 'development', 'production')
          .default('development'),
        APP_PORT: Joi.number().default(3000),
        DB_URL: Joi.string(),
        DB_HOST: Joi.string(),
        DB_PORT: Joi.number(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string(),
        JWT_SECRET: Joi.string(),
        REDIS_HOST: Joi.string(),
        REDIS_PORT: Joi.number(),
        REDIS_PASSWORD: Joi.string(),
        MAIL_HOST: Joi.string(),
        MAIL_PORT: Joi.number(),
        MAIL_FROM: Joi.string(),
        ENV_STAGING_URL: Joi.string(),
        ENV_PRODUCTION_URL: Joi.string(),
      }),
    }),
  ],
})
export class EnvironmentVariablesModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: EnvironmentVariablesModule,
      providers: [EnvironmentVariablesService],
      exports: [EnvironmentVariablesService],
    };
  }
}

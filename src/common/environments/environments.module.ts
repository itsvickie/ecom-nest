import Joi from 'joi';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { EnvironmentService } from './environments.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('test', 'development')
          .default('development'),
        APP_PORT: Joi.number().default(3000),
        DB_URL: Joi.string(),
        DB_HOST: Joi.string(),
        DB_PORT: Joi.string(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        DB_NAME: Joi.string(),
        JWT_SECRET: Joi.string(),
      }),
    }),
  ],
})
export class EnvironmentModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: EnvironmentModule,
      providers: [EnvironmentService],
      exports: [EnvironmentService],
    };
  }
}

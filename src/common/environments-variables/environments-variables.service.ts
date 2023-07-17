import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentVariablesInterface } from './environments-variables.interface';

@Injectable()
export class EnvironmentVariablesService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariablesInterface>,
  ) {}

  get getNodeEnv(): string {
    return this.configService.get('NODE_ENV', { infer: true });
  }

  get getAppPort(): number {
    return this.configService.get('APP_PORT', { infer: true });
  }

  get getDatabaseUrl(): string {
    return this.configService.get('DB_URL', { infer: true });
  }

  get getJwtSecret(): string {
    return this.configService.get('JWT_SECRET', { infer: true });
  }

  get getRedisConnectionConfig(): {
    host: string;
    port: number;
    password: string;
  } {
    return {
      host: this.configService.get<string>('REDIS_HOST'),
      port: this.configService.get<number>('REDIS_PORT'),
      password: this.configService.get<string>('REDIS_PASSWORD'),
    };
  }

  get getEnvironmentUrl(): string {
    switch (this.configService.get('NODE_ENV')) {
      case 'development':
        return `http://localhost:${this.configService.get('APP_PORT')}`;
      case 'test' || 'staging':
        return this.configService.get<string>('ENV_STAGING_URL');
      case 'production':
        return this.configService.get<string>('ENV_PRODUCTION_URL');
    }
  }
}

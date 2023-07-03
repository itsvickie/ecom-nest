import { ConfigService } from '@nestjs/config';
import { EnvironmentInterface } from './environments.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvironmentService {
  constructor(
    private readonly configService: ConfigService<EnvironmentInterface>,
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
      host: this.configService.get<string>('REDIS_URL'),
      port: this.configService.get<number>('REDIS_PORT'),
      password: this.configService.get<string>('REDIS_PASSWORD'),
    };
  }
}

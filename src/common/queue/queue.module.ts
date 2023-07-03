import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

import { QueueService } from '@Queue/queue.service';
import { EnvironmentService } from '@Envs/environments.service';

@Module({})
export class QueueModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: QueueModule,
      providers: [QueueService, EnvironmentService],
      exports: [QueueService],
    };
  }
}

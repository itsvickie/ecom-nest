import { ConfigModuleOptions } from '@nestjs/config';
import { DynamicModule, Module } from '@nestjs/common';

import { QueueService } from './queue.service';

@Module({})
export class QueueModule {
  static forRoot(options?: ConfigModuleOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: QueueModule,
      providers: [QueueService],
      exports: [QueueService],
    };
  }
}

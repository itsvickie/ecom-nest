import { Queue } from 'bullmq';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

import { QUEUES_MAP } from './queue.constant';
import { EnvironmentVariablesService } from '@Envs/environments-variables.service';

@Injectable()
export class QueueService implements OnApplicationBootstrap {
  private readonly bullQueues = new Map<string, Queue>();

  constructor(
    private readonly environmentService: EnvironmentVariablesService,
  ) {}

  onApplicationBootstrap() {
    QUEUES_MAP.forEach((value) => {
      this.setQueue(value);
    });
  }

  setQueue(name: string): void {
    const newQueue = new Queue(name, {
      connection: this.environmentService.getRedisConnectionConfig,
    });
    this.bullQueues.set(name, newQueue);
  }

  getQueue(name: string): Queue {
    if (!this.bullQueues.get(name)) this.setQueue(name);
    return this.bullQueues.get(name);
  }
}

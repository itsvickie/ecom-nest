import { Queue } from 'bullmq';

import { EnvironmentService } from '@Envs/environments.service';

export class QueueService {
  constructor(
    private readonly bullQueues: Map<string, Queue>,
    private readonly environmentService: EnvironmentService,
  ) {
    this.bullQueues = new Map<string, Queue>();
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

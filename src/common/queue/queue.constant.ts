import { QueuesKeys } from './queue.enum';

export const QUEUES_MAP = new Map<QueuesKeys, string>([
  [QueuesKeys.MAILER, 'queue:mailer'],
]);

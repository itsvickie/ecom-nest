import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { QueueModule } from '@Queue/queue.module';
import { MailerModule } from '@Mailer/mailer.module';
import { ProductModule } from './product/product.module';
import { EnvironmentVariablesModule } from '@Envs/environments-variables.module';

@Module({
  imports: [
    UserModule,
    QueueModule.forRoot({ isGlobal: true }),
    MailerModule,
    MailerModule,
    ProductModule,
    EnvironmentVariablesModule.forRoot({ isGlobal: true }),
  ],
})
export class MainModule {}

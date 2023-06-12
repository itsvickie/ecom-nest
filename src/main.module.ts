import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './user/user.service';
import { UserRepository } from './user/user.repository';
import { PasswordHelper } from '@Helpers/password.hash';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductRepository } from './product/product.repository';
import { EnvironmentService } from '@Envs/environments.service';
import { PrismaService } from '@Prisma/prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  // TODO: Descobrir como se conectar ao mailtrap no docker :)
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.mailtrap.io',
        secure: false,
        port: 80,
        auth: {
          user: 'mailtrap',
          pass: 'mailtrap',
        },
        ignoreTLS: true,
      },
      defaults: {
        from: 'teste@gmail.com',
      },
    }),
  ],
  controllers: [ProductController, UserController],
  providers: [
    JwtService,
    UserService,
    ProductService,
    UserRepository,
    PasswordHelper,
    ProductRepository,
    EnvironmentService,
    PrismaService,
  ],
})
export class MainModule {}

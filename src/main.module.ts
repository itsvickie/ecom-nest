import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';

import { UserService } from './user/user.service';
import { PrismaService } from '@Prisma/prisma.service';
import { UserRepository } from './user/user.repository';
import { PasswordHelper } from '@Helpers/password.hash';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductRepository } from './product/product.repository';
import { EnvironmentService } from '@Envs/environments.service';
import { ConfigService } from '@nestjs/config';

@Module({
  // TODO: Descobrir como se conectar ao mailtrap no docker :)
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'localhost',
        secure: false,
        port: 1025,
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
    ConfigService,
  ],
})
export class MainModule {}

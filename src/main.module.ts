import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { UserService } from './user/user.service';
import { MailerService } from '@Mailer/mailer.service';
import { PrismaService } from '@Prisma/prisma.service';
import { UserRepository } from './user/user.repository';
import { PasswordHelper } from '@Helpers/password.hash';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { EnvironmentService } from '@Envs/environments.service';
import { ProductController } from './product/product.controller';
import { ProductRepository } from './product/product.repository';
import { MailerModule } from '@Mailer/mailer.module';

@Module({
  imports: [MailerModule.forRoot({ isGlobal: true })],
  controllers: [ProductController, UserController],
  providers: [
    JwtService,
    UserService,
    PrismaService,
    ConfigService,
    MailerService,
    UserRepository,
    PasswordHelper,
    ProductService,
    ProductRepository,
    EnvironmentService,
  ],
})
export class MainModule {}

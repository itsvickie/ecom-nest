import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { PrismaModule } from '@Prisma/prisma.module';
import { UserService } from './user/user.service';
import { UserRepository } from './user/user.repository';
import { PasswordHelper } from '@Helpers/password.hash';
import { UserController } from './user/user.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductRepository } from './product/product.repository';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      // TODO: Botar a env
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
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
  ],
})
export class MainModule {}

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

@Module({
  imports: [],
  controllers: [ProductController, UserController],
  providers: [
    JwtService,
    UserService,
    ProductService,
    UserRepository,
    PasswordHelper,
    ProductRepository,
    EnvironmentService,
  ],
})
export class MainModule {}

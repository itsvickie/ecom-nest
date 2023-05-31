import { Module } from '@nestjs/common';

import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductRepository } from './product/product.repository';
import { PrismaModule } from '@Prisma/prisma.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserRepository } from './user/user.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController, UserController],
  providers: [ProductService, ProductRepository, UserService, UserRepository],
})
export class MainModule {}

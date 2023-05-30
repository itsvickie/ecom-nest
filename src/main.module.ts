import { Module } from '@nestjs/common';

import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductRepository } from './product/product.repository';
import { PrismaModule } from '@Prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class MainModule {}

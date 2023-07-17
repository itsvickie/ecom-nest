import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { PrismaService } from '@Prisma/prisma.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, PrismaService],
})
export class ProductModule {}

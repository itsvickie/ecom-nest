import { Module } from '@nestjs/common';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';
import { ProductRepository } from './product/product.repository';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
})
export class MainModule {}

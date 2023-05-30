import { Product } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<void> {
    this.productRepository.create(createProductDto);
  }

  async bulk(createProductDtos: CreateProductDto[]): Promise<void> {
    this.productRepository.bulk(createProductDtos);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async findOne(id: string): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    return this.productRepository.findByIds(ids);
  }

  async update(id: string, updateProductDto: CreateProductDto): Promise<void> {
    return this.productRepository.update(id, updateProductDto);
  }

  async remove(id: string): Promise<void> {
    return this.productRepository.remove(id);
  }
}

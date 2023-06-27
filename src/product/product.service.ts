import { Product } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<void> {
    await this.productRepository.create(createProductDto);
  }

  async bulk(createProductDtos: CreateProductDto[]): Promise<void> {
    await this.productRepository.bulk(createProductDtos);
  }

  // TODO: Custom exception
  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  // TODO: Custom exception
  async findOne(id: string): Promise<Product> {
    return await this.productRepository.findOne(id);
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    return await this.productRepository.findByIds(ids);
  }

  // TODO: Custom exception
  async update(
    id: string,
    updateProductDto: CreateProductDto,
  ): Promise<Product> {
    return await this.productRepository.update(id, updateProductDto);
  }

  // TODO: Custom exception
  async remove(id: string): Promise<Product> {
    return await this.productRepository.remove(id);
  }
}

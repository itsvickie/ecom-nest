import { Product } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';
import { CustomException } from '@Exceptions/custom.exception';
import { CustomExceptionMessages } from '@Exceptions/custom.exception.message';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<void> {
    await this.productRepository.createOrUpdate(createProductDto);
  }

  async bulk(createProductDtos: CreateProductDto[]): Promise<void> {
    await this.productRepository.bulk(createProductDtos);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne(id);
    if (!product)
      throw new CustomException(CustomExceptionMessages.E_NOT_FOUND);

    return product;
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    return await this.productRepository.findByIds(ids);
  }

  async update(
    id: string,
    updateProductDto: CreateProductDto,
  ): Promise<Product> {
    updateProductDto.id = id;
    return await this.productRepository.createOrUpdate(updateProductDto);
  }

  async remove(id: string): Promise<Product> {
    return await this.productRepository.remove(id);
  }
}

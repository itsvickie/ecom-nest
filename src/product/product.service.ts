import { Injectable } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductRepository } from './product.repository';
import { ProductModel } from '@Model/product.model';

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  create(createProductDto: CreateProductDto): void {
    this.productRepository.create(createProductDto);
  }

  bulk(createProductDtos: CreateProductDto[]): void {
    this.productRepository.bulk(createProductDtos);
  }

  findAll(): ProductModel[] {
    return this.productRepository.findAll();
  }

  findOne(id: string): ProductModel {
    return this.productRepository.findOne(id);
  }

  findByIds(ids: string[]): ProductModel[] {
    return this.productRepository.findByIds(ids);
  }

  update(id: string, updateProductDto: CreateProductDto): void {
    return this.productRepository.update(id, updateProductDto);
  }

  remove(id: string): void {
    return this.productRepository.remove(id);
  }
}

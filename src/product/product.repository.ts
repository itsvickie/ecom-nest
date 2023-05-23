import { randomUUID } from 'crypto';

import { ProductModel } from '@Model/product.model';
import { ProductMock } from './__mocks__/product.mock';
import { CreateProductDto } from './dto/create-product.dto';

export class ProductRepository {
  constructor(private productMocks: ProductModel[] = ProductMock) {}

  create(createProductDto: CreateProductDto): void {
    const newProduct: ProductModel = Object.assign(createProductDto, {
      id: randomUUID(),
    });
    this.productMocks.push(newProduct);
  }

  bulk(createProductDtos: CreateProductDto[]): void {
    createProductDtos.map((createProductDto) => this.create(createProductDto));
  }

  findAll(): ProductModel[] {
    return this.productMocks;
  }

  findOne(id: string): ProductModel {
    return this.productMocks.find((product) => product.id === id);
  }

  findByIds(ids: string[]): ProductModel[] {
    return this.productMocks.filter((product) => ids.includes(product.id));
  }

  update(id: string, updateProductDto: CreateProductDto): void {
    const indexProduct = this.productMocks.findIndex((product) => {
      product.id === id;
    });
    if (!indexProduct) return null;

    this.productMocks[indexProduct].name = updateProductDto.name;
    this.productMocks[indexProduct].price = updateProductDto.price;
    this.productMocks[indexProduct].image_key = updateProductDto.image_key;
    this.productMocks[indexProduct].description = updateProductDto.description;
  }

  remove(id: string): void {
    const indexProduct = this.productMocks.findIndex((product) => {
      product.id === id;
    });
    if (!indexProduct) return null;

    this.productMocks.splice(indexProduct, 1);
  }
}

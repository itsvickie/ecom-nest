import { Product } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { PrismaService } from '@Prisma/prisma.service';
@Injectable()
export class ProductRepository {
  constructor(private prisma: PrismaService) {}

  async bulk(createProductDtos: CreateProductDto[]): Promise<void> {
    await this.prisma.product.createMany({ data: createProductDtos });
  }

  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async findOne(id: string): Promise<Product> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    return this.prisma.product.findMany({ where: { id: { in: ids } } });
  }

  async createOrUpdate(dataProduct: CreateProductDto): Promise<Product> {
    return await this.prisma.product.upsert({
      where: { id: dataProduct.id },
      update: dataProduct,
      create: dataProduct,
    });
  }

  async remove(id: string): Promise<Product> {
    return await this.prisma.product.delete({ where: { id } });
  }
}

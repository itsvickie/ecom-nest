import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  Controller,
  ParseArrayPipe,
} from '@nestjs/common';
import { Product } from '@prisma/client';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Post('/bulk')
  async bulk(
    @Body(new ParseArrayPipe({ items: CreateProductDto }))
    createProductDtos: CreateProductDto[],
  ) {
    return await this.productService.bulk(createProductDtos);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @Get('/findByIds')
  async findByIds(
    @Query('ids', new ParseArrayPipe({ items: String, separator: ',' }))
    ids: string[],
  ): Promise<Product[]> {
    return await this.productService.findByIds(ids);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: CreateProductDto,
  ): Promise<any> {
    await this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    await this.productService.remove(id);
  }
}

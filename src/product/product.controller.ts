import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  ParseArrayPipe,
  Query,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Product } from '@prisma/client';

import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { EXCEPTION_CODES } from '../common/helpers/exceptions/exception-codes.enum';

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
    @Res() res: Response,
  ): Promise<any> {
    try {
      await this.productService.update(id, updateProductDto);
    } catch (e) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ error: { message: EXCEPTION_CODES.E_RECORD_NOT_FOUND } });
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response): Promise<any> {
    try {
      await this.productService.remove(id);
    } catch (e) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ error: { message: EXCEPTION_CODES.E_RECORD_NOT_FOUND } });
    }
  }
}

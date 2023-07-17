import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { PrismaService } from '@Prisma/prisma.service';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';
import { AuthMiddleware } from '@Middleware/auth.middleware';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductRepository, PrismaService],
})
export class ProductModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'product', method: RequestMethod.GET },
        { path: 'product/:id', method: RequestMethod.GET },
      )
      .forRoutes(ProductController);
  }
}

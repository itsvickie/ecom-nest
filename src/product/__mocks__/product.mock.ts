import { randomUUID } from 'crypto';
import { ProductModel } from '../../common/database/postgres/models/product.model';

export const ProductMock: ProductModel[] = [
  {
    id: randomUUID(),
    name: 'Product1',
    description: 'ProductDescription1',
    image_key: randomUUID(),
    price: 29.9,
  },
  {
    id: randomUUID(),
    name: 'Product2',
    description: 'ProductDescription2',
    image_key: randomUUID(),
    price: 39.9,
  },
];

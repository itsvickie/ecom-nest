import { UUID } from 'crypto';

// TODO: Implementar o model do ORM (por enquanto mock)
export interface ProductModel {
  id: UUID;
  name: string;
  description: string;
  image_key: string;
  price: number;
}

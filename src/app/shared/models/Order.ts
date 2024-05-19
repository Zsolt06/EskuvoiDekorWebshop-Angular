import { Product } from './Product';

export interface Order {
    id: string;
    userId: string;
    products: Product[];
    totalPrice: number;
  }
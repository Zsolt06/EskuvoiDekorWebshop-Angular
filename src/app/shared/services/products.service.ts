import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [
    { id: '1', name: 'Chair', description: 'Comfortable chair for your living room', price: 99.99, category: { id: '1', name: 'Furniture'} },
    { id: '2', name: 'Curtains', description: 'Elegant curtains to enhance your windows', price: 49.99, category: { id: '2', name: 'Home Decor'} },
    { id: '3', name: 'Table Lamp', description: 'Modern lamp for your bedside table', price: 29.99, category: { id: '3', name: 'Lighting'} },
    { id: '1', name: 'Chair', description: 'Comfortable chair for your living room', price: 99.99, category: { id: '1', name: 'Furniture'} },
    { id: '2', name: 'Curtains', description: 'Elegant curtains to enhance your windows', price: 49.99, category: { id: '2', name: 'Home Decor'} },
    { id: '3', name: 'Table Lamp', description: 'Modern lamp for your bedside table', price: 29.99, category: { id: '3', name: 'Lighting'} },
  ];

  constructor() { }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
  }
}

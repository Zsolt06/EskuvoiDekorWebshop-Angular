import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { DatabaseService } from './database.service';
import { collection, getDocs, limit, orderBy, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [];

  constructor(private dbService: DatabaseService) { 
    this.loadProducts();
  }

  async loadProducts() {
    const productCollection = collection(this.dbService.firestore, 'product');
    const productSnapshot = await getDocs(productCollection);
    productSnapshot.forEach(async (doc) => {
      const productData = await this.dbService.getProductData(doc.id);
      if (productData) {
        this.products.push(productData);
      }
    });
  }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  async sortProductsByName(): Promise<Product[]> {
    const productCollection = collection(this.dbService.firestore, 'product');
    const q = query(productCollection, orderBy('name'), limit(10));
    const productSnapshot = await getDocs(q);
    this.products = productSnapshot.docs.map(doc => doc.data() as Product);
    return this.products;
  }

  async sortProductsByPrice(): Promise<Product[]> {
    const productCollection = collection(this.dbService.firestore, 'product');
    const q = query(productCollection, orderBy('price'), limit(10));
    const productSnapshot = await getDocs(q);
    this.products = productSnapshot.docs.map(doc => doc.data() as Product);
    return this.products;
  }
  async deleteProduct(id: string) {
    await this.dbService.deleteProduct(id);
    this.products = this.products.filter(product => product.id !== id);
  }
}

import { Injectable } from '@angular/core';
import { Product } from '../models/Product';
import { Firestore, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: Product[] = [];

  constructor(public firestore: Firestore) { }

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
  }

  async loadProducts() {
    const productCollection = collection(this.firestore, 'product');
    const productSnapshot = await getDocs(productCollection);
    productSnapshot.forEach(async (doc) => {
      const productData = await this.getProductData(doc.id);
      if (productData) {
        this.products.push(productData);
      }
    });
  }

  async getProductData(documentId: string): Promise<Product | null> {
    const docSnap = await getDoc(doc(this.firestore, 'product', documentId));
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data) {
        return {
          id: documentId,
          name: data['name'],
          description: data['description'],
          price: data['price'],
          category: data['category'],
        } as Product;
      }
    } else {
      console.log('No such document!');
    }
    return null;
  }

  async sortProductsByName(): Promise<Product[]> {
    const productCollection = collection(this.firestore, 'product');
    const q = query(productCollection, orderBy('name'));
    const productSnapshot = await getDocs(q);
    this.products = productSnapshot.docs.map(doc => doc.data() as Product);
    return this.products;
  }

  async sortProductsByPrice(): Promise<Product[]> {
    const productCollection = collection(this.firestore, 'product');
    const q = query(productCollection, orderBy('price'));
    const productSnapshot = await getDocs(q);
    this.products = productSnapshot.docs.map(doc => doc.data() as Product);
    return this.products;
  }

  async deleteProduct(productId: string): Promise<void> {
    const productRef = doc(this.firestore, 'product', productId);
    await deleteDoc(productRef);
    this.products = this.products.filter(product => product.id !== productId);
  }

  clearProducts(): void {
    this.products = [];
  }
}

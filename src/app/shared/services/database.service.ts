import { Injectable } from '@angular/core';
import { Firestore, deleteDoc, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public firestore: Firestore) { }

  async createUser(email: string, password: string, name: string, userID: string, role: string) {
    await setDoc( doc( this.firestore, 'users', userID), {
      email: email,
      password: password,
      name: name,
      role: role,
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

  async getUserName(userID: string): Promise<string | null> {
    const docSnap = await getDoc(doc(this.firestore, 'users', userID));
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data) {
        return data['name'] as string;
      }
    } else {
      console.log('No such user!');
    }
    return null;
  }

  async getUserRole(userID: string): Promise<string | null> {
    const docSnap = await getDoc(doc(this.firestore, 'users', userID));
    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data) {
        return data['role'] as string;
      }
    } else {
      console.log('No such user!');
    }
    return null;
  }

  async deleteProduct(documentId: string) {
    await deleteDoc(doc(this.firestore, 'product', documentId));
  }
}

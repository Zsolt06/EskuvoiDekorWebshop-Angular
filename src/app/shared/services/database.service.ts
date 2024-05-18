import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private firestore: Firestore) { }

  async createUser(email: string, password: string, name: string, userID: string, role: string) {
    await setDoc( doc( this.firestore, 'users', userID), {
      email: email,
      password: password,
      name: name,
      role: role,
    });
  }
}

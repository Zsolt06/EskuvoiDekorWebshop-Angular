import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(public firestore: Firestore) { }

  async createUser(email: string, password: string, name: string, userID: string, role: string) {
    await setDoc( doc( this.firestore, 'users', userID), {
      email: email,
      password: password,
      name: name,
      role: role,
    });
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
}

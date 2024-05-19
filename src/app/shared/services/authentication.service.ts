import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { deleteUser } from 'firebase/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private auth: AngularFireAuth,
    private firestore: Firestore,
  ) { }

  login(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  register(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  isUserLoggedIn(): Observable<firebase.User | null> {
    return this.auth.user;
  }

  logout() {
    return this.auth.signOut();
  }

  currentUser(): Observable<firebase.User | null> {
    return this.auth.user;
  }

  async getCurrentUserId(): Promise<string | null> {
    const user = await this.auth.currentUser;
    if (user) {
      const userDoc = await getDoc(doc(this.firestore, 'users', user.uid));
      if (userDoc.exists()) {
        console.log(userDoc.id);
        return userDoc.id;
      }
    }
    return null;
  }
  
  
  deleteUser() {
    return this.auth.currentUser.then(user => {
      return user?.delete();
    });
  }

  resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email);
  }
}
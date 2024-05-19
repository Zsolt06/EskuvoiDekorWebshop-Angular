import { Injectable } from '@angular/core';
import { Firestore, deleteDoc, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  constructor(public firestore: Firestore) { }
}

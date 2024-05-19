import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Cart } from '../models/Cart';
import { Firestore, addDoc, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { ProductsService } from './products.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {}
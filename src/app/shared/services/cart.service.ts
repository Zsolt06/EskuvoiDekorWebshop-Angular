import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Cart } from '../models/Cart';
import { Firestore, addDoc, collection, doc, getDoc, setDoc } from '@angular/fire/firestore';
import { ProductsService } from './products.service';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart | null = null;

  constructor(private firestore: Firestore, private auth: AuthenticationService, private productsService: ProductsService) { }

  getCart(): Cart | null {
    return this.cart;
  }

  async getCartByUserId(userId: string): Promise<Cart | null> {
    console.log(`Getting cart for user: ${userId}`);
    const docSnap = await getDoc(doc(this.firestore, 'carts', userId));
    console.log(`Document snapshot for user ${userId}:`, docSnap);
    if (docSnap.exists()) {
      console.log(`Cart data for user ${userId}:`, docSnap.data());
      return docSnap.data() as Cart;
    } else {
      console.log(`No cart found for user ${userId}`);
      return null;
    }
  }
  

  async createCart(userId: string): Promise<Cart> {
    const newCart: Cart = {
      userId: userId,
      items: [],
      totalPrice: 0
    };
    const docRef = await addDoc(collection(this.firestore, 'carts'), newCart);
    newCart.id = docRef.id;
    return newCart;
  }

  async loadCart() {
    try {
      const userId = await this.auth.getCurrentUserId();
      if (userId) {
        let cart = await this.getCartByUserId(userId);
        if (!cart) {
          // Check if a cart already exists in the database
          const docSnap = await getDoc(doc(this.firestore, 'carts', userId));
          if (docSnap.exists()) {
            cart = docSnap.data() as Cart;
          } else {
            // Only create a new cart if one does not already exist
            cart = await this.createCart(userId);
          }
        }
        this.cart = cart;
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  }
  

  async addToCart(productId: string, quantity: number = 1) {
    if (!this.cart) {
      const userId = await this.auth.getCurrentUserId();
      if (userId) {
        this.cart = await this.createCart(userId);
      }
    }
    if (this.cart) {
      const product = await this.productsService.getProductById(productId);
      if (product) {
        // Find the item with the given productId
        const item = this.cart.items.find(item => item.product.id === productId);
        if (item) {
          // If the item already exists in the cart, just increase the quantity
          item.quantity += quantity;
        } else {
          // If the item does not exist in the cart, add a new item
          this.cart.items.push({ product: product, quantity: quantity });
        }
        this.cart.totalPrice += product.price * quantity;
        if (this.cart.id) { // Ensure cart id is defined
          await setDoc(doc(this.firestore, 'carts', this.cart.id), this.cart);
        }
      }
    }
  }

  async removeFromCart(productId: string) {
    if (this.cart) {
      const itemIndex = this.cart.items.findIndex(item => item.product.id === productId);
      if (itemIndex > -1) {
        const item = this.cart.items[itemIndex];
        this.cart.totalPrice -= item.product.price * item.quantity;
        this.cart.items.splice(itemIndex, 1);
        if (this.cart.id) { // Ensure cart id is defined
          await setDoc(doc(this.firestore, 'carts', this.cart.id), this.cart);
        }
      }
    }
  }
}

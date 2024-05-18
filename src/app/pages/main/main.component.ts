import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { ProductsService } from '../../shared/services/products.service';
import { DatabaseService } from '../../shared/services/database.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, DoCheck {
  displayedColumns: string[] = ['name', 'description', 'price', 'category'];

  products: Product[] = [];

  currentUser: firebase.User | null = null;

  currentUserName: string | null = null;

  currentUserRole: string | null = null;

  constructor(
    private productsService: ProductsService,
    private dbService: DatabaseService,
    private authService: AuthenticationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.products = this.productsService.getProducts();
  
    this.authService.currentUser().subscribe(user => {
      this.currentUser = user;
      if (this.currentUser) {
        this.dbService.getUserRole(this.currentUser.uid).then(role => {
          this.currentUserRole = role;
          console.log(role);
        });
        this.dbService.getUserName(this.currentUser.uid).then(name => {
          this.currentUserName = name;
          console.log(name);
        });
      }
    });
  }

  ngDoCheck(): void {
    this.products = this.productsService.getProducts();
  }

  async sortProducts(value: string): Promise<void> {
    if (value === 'name') {
      this.products = await this.productsService.sortProductsByName();
    } else if (value === 'price') {
      this.products = await this.productsService.sortProductsByPrice();
    }
  }

  async deleteProduct(id: string) {
    await this.productsService.deleteProduct(id);
  }

  async addToCart(productId: string) {
    if (this.currentUser) {
      console.log(`Product ${productId} added to the cart.`);
    } else {
      alert('Jelentkezz be a vásárláshoz!');
    }
  }
  
}

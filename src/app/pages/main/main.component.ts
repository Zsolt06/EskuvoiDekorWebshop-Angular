import { Component, DoCheck, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { ProductsService } from '../../shared/services/products.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import firebase from 'firebase/compat/app';
import { UsersService } from '../../shared/services/users.service';
import { CartService } from '../../shared/services/cart.service';

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
    private userService: UsersService,
    private authService: AuthenticationService,
    private cartService: CartService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.productsService.loadProducts();
    this.products = this.productsService.getProducts();
    console.log("Lefutottam!");
  
    this.authService.currentUser().subscribe(user => {
      this.currentUser = user;
      if (this.currentUser) {
        this.userService.getUserRole(this.currentUser.uid).then(role => {
          this.currentUserRole = role;
          console.log(role);
        });
        this.userService.getUserName(this.currentUser.uid).then(name => {
          this.currentUserName = name;
          console.log(name);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.productsService.clearProducts();
    console.log('MainComponent destroyed!');
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

  parentValue = '';

  onValueChanged(newValue: string) {
    console.log('Az új érték:', newValue);
    this.parentValue = newValue;
    this.sortProducts(newValue);
  }

  async deleteProduct(id: string) {
    await this.productsService.deleteProduct(id);
  }

  async addToCart(productId: string) {
    if (this.currentUser) {
      
    } else {
      alert('Jelentkezz be a vásárláshoz!');
    }
  }
}

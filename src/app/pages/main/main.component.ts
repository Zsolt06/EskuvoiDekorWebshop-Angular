import { Component, OnInit } from '@angular/core';
import { Product } from '../../shared/models/Product';
import { ProductsService } from '../../shared/services/products.service';
import { Category } from '../../shared/models/Category';
import { CategoryService } from '../../shared/services/category.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  displayedColumns: string[] = ['name', 'description', 'price', 'category'];

  categories: Category[] = [];

  products: Product[] = [];

  constructor(
    private categoryService: CategoryService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.products = this.productsService.getProducts();
  }
}

import { Injectable } from '@angular/core';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private category: Category[] = [
    { id: '1', name: 'Furniture'},
    { id: '2', name: 'Home Decor'},
    { id: '3', name: 'Lighting'},
  ];

  constructor() { }

  getCategories(): Category[] {
    return this.category;
  }

  getCategoryById(id: string): Category | undefined {
    return this.category.find(category => category.id === id);
  }
}

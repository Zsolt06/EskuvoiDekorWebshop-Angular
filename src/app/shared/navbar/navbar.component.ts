import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  showSearchField = false;

  toggleSearch() {
    this.showSearchField = !this.showSearchField;
  }

  search(query: string) {
    console.log('Search query:', query);
    // Implement your search logic here
  }
}

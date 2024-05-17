import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  search(searchTerm: string) {
    // Add your search logic here based on the searchTerm
    console.log('Searching for:', searchTerm);
  }
}

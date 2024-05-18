import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {
  isLoggedIn$!: Observable<firebase.User | null>;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isUserLoggedIn();
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    });
  }

  showSearchField = false;

  toggleSearch() {
    this.showSearchField = !this.showSearchField;
  }

  search(query: string) {
    console.log('Search query:', query);
    // Implement your search logic here
  }
}

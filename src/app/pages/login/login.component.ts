import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from '../../shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy{
  loginForm = new FormGroup({
    email : new FormControl(''),
    password : new FormControl(''),
  })

  loadingSubscription ?: Subscription;
  loadingObservation?: Observable<boolean>;

  ngOnDestroy(): void {}
  ngOnInit(): void {}

  loading: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router){}


  async login(event: Event){
    event.preventDefault();

    const emailValue = (this.loginForm.get('email')?.value || '') as string;
    const passwordValue = (this.loginForm.get('password')?.value || '') as string;

    this.authService.login(emailValue, passwordValue).then(cred => {
      console.log(cred);
      this.router.navigateByUrl('/home');
      this.loading = false;
    }).catch(error => {
      alert('A felhasználónév vagy jelszó nem megfelelő!');
      this.loading = false;
    });
  }
}

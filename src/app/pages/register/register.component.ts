import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { DatabaseService } from '../../shared/services/database.service';
import { getAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    name: new FormControl(''),
    role: new FormControl(''),
  });

  loadingSubscription ?: Subscription;
  loadingObservation?: Observable<boolean>;

  ngOnDestroy(): void {}
  ngOnInit(): void {}

  constructor(private authService: AuthenticationService, private router: Router, private database: DatabaseService){}

  async register(event: Event){
    event.preventDefault();

    const emailValue = (this.registerForm.get('email')?.value || '') as string;
    const passwordValue = (this.registerForm.get('password')?.value || '') as string;
    const confirmPasswordValue = (this.registerForm.get('confirmPassword')?.value || '') as string;
    const nameValue = (this.registerForm.get('name')?.value || '') as string;
    const roleValue = (this.registerForm.get('role')?.value || '') as string;

    if (!emailValue || !passwordValue || !nameValue || !roleValue) {
      alert('Minden mező kitöltése kötelező!');
      return;
    }

    if (passwordValue !== confirmPasswordValue) {
      alert('A két jelszó nem egyezik meg!');
      return;
    }
      this.authService.register(emailValue, passwordValue).then(cred => {
        let auth = getAuth();
        let user = auth.currentUser;
        this.database.createUser(emailValue, passwordValue, nameValue, user?.uid ?? '', roleValue).then(cred2 =>{
          console.log(cred2);
        });
        
        this.router.navigateByUrl('/login');
      }).catch(error => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert(`Email address already in use.`)
            break;
          case 'auth/invalid-email':
            alert(`Email address ${emailValue} is invalid.`);
            break;
          case 'auth/operation-not-allowed':
            alert('Error during sign up.');
            break;
          case 'auth/weak-password':
            alert ('Password is not strong enough. Add additional characters including special characters and numbers.');
            break;
          default:
            alert('An error occurred.' + error.message);
            break;
        }
      });
  }
}

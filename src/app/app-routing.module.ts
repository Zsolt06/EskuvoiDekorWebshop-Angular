import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  { 
    path: 'cart', 
    loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

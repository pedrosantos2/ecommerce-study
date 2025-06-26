import { Routes } from '@angular/router';


import { AuthLayout } from './layout/auth-layout/auth-layout';
import { Login } from './pages/login/login';
import { Cadastrado } from './pages/cadastro/cadastro';
import { MainLayoutComponent } from './layout/main-layout/main-layout';
import { Home } from './pages/home/home';
import { Categoria } from './pages/categoria/categoria';
import { Produto } from './pages/produto/produto';
import { AuthGuard } from './auth/auth.guard';


export const routes: Routes = [
 
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: 'login',    component: Login },
      { path: 'cadastro', component: Cadastrado },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  },

  {
    path: '',
    component: MainLayoutComponent,
    canActivateChild: [AuthGuard],   
    children: [
      { path: 'home',       component: Home },
      { path: 'categorias', component: Categoria },
      { path: 'produtos',   component: Produto },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },


  { path: '**', redirectTo: '' }
];

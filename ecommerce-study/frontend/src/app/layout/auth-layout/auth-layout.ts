import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule      // ← aqui
  ],
  template: `
    <router-outlet></router-outlet>
  `
})
export class AuthLayout {}

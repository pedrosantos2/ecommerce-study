import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../components/sidebar/sidebar';
import { Container } from '../../components/container/container';



@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,          // ← e aqui
    Sidebar,
    Container
  ],
  template: `
    <div class="main flex">
      <app-sidebar></app-sidebar>
      <app-container>
        <router-outlet></router-outlet>
      </app-container>
    </div>
  `
})
export class MainLayoutComponent {}

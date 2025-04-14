import { Component, Input } from '@angular/core';
import {TuiAvatar} from '@taiga-ui/kit';
import {TuiAppearance, TuiButton, TuiTitle} from '@taiga-ui/core';
import {TuiCardLarge, TuiCell, TuiHeader} from '@taiga-ui/layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-item-sidebar',
  imports: [
    TuiCell,
    TuiAvatar,
    TuiTitle,
    CommonModule,
    RouterModule],
  templateUrl: './item-sidebar.component.html',
  styleUrl: './item-sidebar.component.css',
})
export class ItemSidebarComponent {
  titulosMenus = [
    { titulo: 'Home', link: '/' },
    { titulo: 'Produtos', link: '/produtos' },
    { titulo: 'Categorias', link: '/categorias' },
    { titulo: 'Contatos', link: '/contatos' }
  ]
}

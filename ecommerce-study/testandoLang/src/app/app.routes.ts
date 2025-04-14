import { Routes } from '@angular/router';
import { ProdutosComponent } from '../pages/produtos/produtos.component';
import { AppComponent } from './app.component';
import { HomeComponent } from '../pages/home/home.component';
import { CategoriasComponent } from '../pages/categorias/categorias.component';

export const routes: Routes = [
    {
        path: '', component:HomeComponent
    },
    {
        path: 'produtos', component: ProdutosComponent
    },
    {
        path: 'categorias', component: CategoriasComponent
    }
    
]

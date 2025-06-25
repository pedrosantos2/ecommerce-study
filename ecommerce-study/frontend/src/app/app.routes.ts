import { Routes } from '@angular/router';
import { Home } from './pages/home/home';

import { Categoria } from './pages/categoria/categoria';
import { Produto } from './pages/produto/produto';

export const routes: Routes = [
    {
        path:'', component: Home
    },
    {
        path:'produto', component: Produto
    },
    {
        path:'categoria', component: Categoria
    }
];

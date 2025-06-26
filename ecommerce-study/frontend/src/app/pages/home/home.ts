import { Component, OnInit }             from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { HttpClientModule, HttpClient }  from '@angular/common/http';
import { Product } from '../../model/produto';
import { CategoriaModel } from '../../model/categoriaModel';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  totalProducts: number    = 0;
  totalCategories: number  = 0;
  accessCount: number      = 0;
  lastProducts: Product[]  = [];

  private produtosUrl      = 'http://localhost:8080/home/produtos';
  private categoriasUrl    = 'http://localhost:8080/home/categorias';
  private accessCountUrl   = 'http://localhost:8080/home/metrics/accessCount';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadMetrics();
    this.loadLastProducts();
  }

  private loadMetrics(): void {
    // Total de produtos
    this.http.get<Product[]>(this.produtosUrl)
      .subscribe(prods => this.totalProducts = prods.length);

    // Total de categorias
    this.http.get<CategoriaModel[]>(this.categoriasUrl)
      .subscribe(cats => this.totalCategories = cats.length);

    // Total de acessos (supondo um endpoint que retorne { count: number })
    this.http.get<{ count: number }>(this.accessCountUrl)
      .subscribe(res => this.accessCount = res.count);
  }

  private loadLastProducts(): void {
    this.http.get<Product[]>(
      `${this.produtosUrl}?sort=createdAt,desc&size=4`
    ).subscribe(prods => this.lastProducts = prods);
  }
}

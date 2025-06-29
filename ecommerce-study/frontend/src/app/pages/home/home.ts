// src/app/home/home.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';


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
  totalProducts = 0;
  totalCategories = 0;
  accessCount = 0;
  lastProducts: any[] = [];
  currentUser: string | null = '';

  private produtosUrl    = 'http://localhost:8080/home/produtos';
  private categoriasUrl  = 'http://localhost:8080/home/categorias';
  private accessCountUrl = 'http://localhost:8080/home/metrics/accessCount';

  constructor(
    private http: HttpClient,
    private auth: AuthService    // ← injete AuthService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.auth.getUsername();
    this.loadMetrics();
    this.loadLastProducts();
  }

  private loadMetrics(): void {
    this.http.get<any[]>(this.produtosUrl)
      .subscribe(prods => this.totalProducts = prods.length);
    this.http.get<any[]>(this.categoriasUrl)
      .subscribe(cats => this.totalCategories = cats.length);
    this.http.get<{ count: number }>(this.accessCountUrl)
      .subscribe(res => this.accessCount = res.count);
  }

  private loadLastProducts(): void {
    this.http.get<any[]>(`${this.produtosUrl}?sort=createdAt,desc&size=4`)
      .subscribe(prods => this.lastProducts = prods);
  }
}

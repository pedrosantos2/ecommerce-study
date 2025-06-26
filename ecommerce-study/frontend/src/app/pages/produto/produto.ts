import { Component, OnInit }        from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Modalform }                from '../../components/modalform/modalform';
import { NgxPaginationModule }      from 'ngx-pagination';

import { Product }        from '../../model/produto';
import { FieldConfig }    from '../../model/field-config';
import { produtoFields as baseFields } from '../../model/produtofields';

interface Category { id: number; nome: string; }

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,            // ← para ngModel
    HttpClientModule,
    Modalform,
    NgxPaginationModule     // ← paginação
  ],
  templateUrl: './produto.html',
  styleUrls: ['./produto.css']
})
export class Produto implements OnInit {
  products: Product[] = [];

  // **busca**
  searchTerm: string = '';

  // **paginação**
  page = 1;
  itemsPerPage = 6;

  produtoFields: FieldConfig[] = [];
  showModal = false;
  selectedProduct: Product | null = null;

  private produtosUrl   = 'http://localhost:8080/home/produtos';
  private categoriasUrl = 'http://localhost:8080/home/categorias';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this.http.get<Product[]>(this.produtosUrl)
      .subscribe({
        next: data => this.products = data,
        error: err   => console.error('Erro ao carregar produtos', err)
      });
  }

  // **getter que filtra nome|descrição|categoria**
  get filteredProducts(): Product[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.products;
    return this.products.filter(p =>
      p.nome.toLowerCase().includes(term) ||
      p.descricao.toLowerCase().includes(term) ||
      p.categoria.nome.toLowerCase().includes(term)
    );
  }

  get lastFourProducts(): Product[] {
  return [...this.filteredProducts].slice(-4);
}


  async openModal(): Promise<void>   { /* ...já tinha */ }
  async editProduct(p: Product): Promise<void> { /* ... */ }
  closeModal(): void                { /* ... */ }
  handleProdutoSubmit(data: any): void { /* ... */ }
  deleteProduct(id: number): void   { /* ... */ }
}

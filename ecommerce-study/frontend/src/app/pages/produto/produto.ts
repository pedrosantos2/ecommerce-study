import { Component, OnInit }        from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { lastValueFrom }            from 'rxjs';
import { Modalform }                from '../../components/modalform/modalform';
import { NgxPaginationModule }      from 'ngx-pagination';

import { Product }       from '../../model/produto';
import { FieldConfig }   from '../../model/field-config';
import { produtoFields as baseFields } from '../../model/produtofields';

interface Category { id: number; nome: string; }

@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    Modalform,
    NgxPaginationModule
  ],
  templateUrl: './produto.html',
  styleUrls: ['./produto.css']
})
export class Produto implements OnInit {
  products: Product[]           = [];
  searchTerm: string            = '';
  page = 1;
  itemsPerPage = 6;
  produtoFields: FieldConfig[]  = [];
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

  private async loadCategorias(): Promise<Category[]> {
    try {
      return await lastValueFrom(this.http.get<Category[]>(this.categoriasUrl));
    } catch (err) {
      console.error('Erro ao carregar categorias', err);
      return [];
    }
  }

  private async prepareFields(): Promise<void> {
    const cats = await this.loadCategorias();
    const options = cats.map(c => ({ value: c.id, label: c.nome }));
    this.produtoFields = baseFields.map(f =>
      f.name === 'categoriaId' ? { ...f, options } : f
    );
  }

  async openModal(): Promise<void> {
    this.selectedProduct = null;
    await this.prepareFields();
    this.showModal = true;
  }

  async editProduct(p: Product): Promise<void> {
    this.selectedProduct = p;
    await this.prepareFields();
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  handleProdutoSubmit(formData: any): void {
    const isEdit = !!this.selectedProduct;
    const url = isEdit
      ? `${this.produtosUrl}/${this.selectedProduct!.id}`
      : this.produtosUrl;
    const req$ = isEdit
      ? this.http.put<Product>(url, formData)
      : this.http.post<Product>(url, formData);

    req$.subscribe({
      next: () => {
        this.closeModal();
        this.loadProducts();
      },
      error: err => console.error(isEdit ? 'Erro ao atualizar' : 'Erro ao criar', err)
    });
  }

  deleteProduct(id: number): void {
    if (!confirm('Confirma exclusão?')) return;
    this.http.delete(`${this.produtosUrl}/${id}`)
      .subscribe({
        next: () => this.loadProducts(),
        error: err => console.error('Erro ao excluir', err)
      });
  }

  get filteredProducts(): Product[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.products;
    return this.products.filter(p =>
      p.nome.toLowerCase().includes(term) ||
      p.descricao.toLowerCase().includes(term) ||
      p.categoria.nome.toLowerCase().includes(term)
    );
  }
}

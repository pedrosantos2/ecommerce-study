import { Component, OnInit }         from '@angular/core';
import { CommonModule }              from '@angular/common';
import { FormsModule }               from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Modalform }                 from '../../components/modalform/modalform';
import { NgxPaginationModule }       from 'ngx-pagination';

import { CategoriaModel } from '../../model/categoriaModel';
import { categoriaFields } from '../../model/categoriaFields';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,        // ← necessário para [(ngModel)]
    HttpClientModule,
    Modalform,
    NgxPaginationModule // ← paginação
  ],
  templateUrl: './categoria.html',
  styleUrls: ['./categoria.css']
})
export class Categoria implements OnInit {
  categorias: CategoriaModel[] = [];

  // **busca**
  searchTerm: string = '';

  // **paginação**
  page = 1;
  itemsPerPage = 6;

  showModal = false;
  selectedCategory: CategoriaModel | null = null;
  categoriaFields = categoriaFields;

  private baseUrl = 'http://localhost:8080/home/categorias';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories(): void {
    this.http.get<CategoriaModel[]>(this.baseUrl)
      .subscribe({
        next: data => this.categorias = data,
        error: err  => console.error('Erro ao carregar categorias', err)
      });
  }

  // **getter que aplica o filtro**
  get filteredCategorias(): CategoriaModel[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.categorias;
    return this.categorias.filter(c =>
      c.nome.toLowerCase().includes(term)
    );
  }

  openModal(): void   { this.selectedCategory = null; this.showModal = true; }
  editCategory(c: CategoriaModel): void { this.selectedCategory = c; this.showModal = true; }
  closeModal(): void  { this.showModal = false; }

  handleCategoriaSubmit(formData: any): void {
    const isEdit = !!this.selectedCategory;
    const url = isEdit
      ? `${this.baseUrl}/${this.selectedCategory!.id}`
      : this.baseUrl;

    const req$ = isEdit
      ? this.http.put(url, formData)
      : this.http.post(url, formData);

    req$.subscribe({
      next: () => { this.closeModal(); this.loadCategories(); },
      error: err => console.error(isEdit ? 'Erro ao atualizar' : 'Erro ao criar', err)
    });
  }

  deleteCategory(id: number): void {
    if (!confirm('Confirma exclusão desta categoria?')) return;
    this.http.delete(`${this.baseUrl}/${id}`)
      .subscribe({
        next: () => this.loadCategories(),
        error: err => console.error('Erro ao excluir categoria', err)
      });
  }
}

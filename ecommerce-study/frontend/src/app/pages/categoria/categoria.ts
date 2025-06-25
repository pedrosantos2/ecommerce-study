import { Component } from '@angular/core';
import { Modalform } from '../../components/modalform/modalform';
import { categoriaFields } from '../../model/categoriaFields';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CategoriaModel } from '../../model/categoriaModel';

@Component({
  selector: 'app-categoria',
  imports: [ CommonModule,
    HttpClientModule,
    Modalform],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css'
})
export class Categoria {
  categorias: CategoriaModel[] = [];
  showModal = false;
  categoriaFields = categoriaFields;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadCategories();
  }

   private loadCategories(): void {
    this.http.get<CategoriaModel[]>('http://localhost:8080/home/categorias')
      .subscribe({
        next: data => {
          console.log('categorias carregadas:', data);
          this.categorias = data;
        },
        error: err => console.error('Erro ao carregar categorias', err)
      });
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

   onProductAdded(): void {
    this.closeModal();
    this.loadCategories();
  }

  handleCategoriaSubmit(categoriaData: any) {
    console.log('Categoria enviada:', categoriaData);
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Modalform } from '../../components/modalform/modalform';
import { Product } from '../../model/produto';


@Component({
  selector: 'app-produto',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    Modalform
  ],
  templateUrl: './produto.html',
  styleUrls:   ['./produto.css']
})
export class Produto implements OnInit {
  products: Product[] = [];
  showModal = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProducts();
  }

   private loadProducts(): void {
    this.http.get<Product[]>('http://localhost:8080/home/produtos')
      .subscribe({
        next: data => {
          console.log('produtos carregados:', data);
          this.products = data;
        },
        error: err => console.error('Erro ao carregar produtos', err)
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
    this.loadProducts();     
  }
}

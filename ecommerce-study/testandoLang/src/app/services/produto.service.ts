import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Produto } from '../models/produto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private url = environment.api

  constructor(private httpClient: HttpClient) {

   }


  obterProdutos(){
    return this.httpClient.get<Produto[]>(`${this.url}/home/produtos`)
  }

  buscarPorNome(nome : String): Observable<Produto[]>{
    return this.httpClient.get<Produto[]>(`${this.url}/home/produtos/?nome=${nome}`)
  }
}

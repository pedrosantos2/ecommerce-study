import { CategoriaModel } from './categoriaModel';
export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: CategoriaModel;
}

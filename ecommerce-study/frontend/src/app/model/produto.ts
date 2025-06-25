export interface Categoria {
  id: number;
  nome: string;
}

export interface Product {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: Categoria;
}

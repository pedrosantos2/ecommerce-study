package com.ecommerce.Loja.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ecommerce.Loja.DTO.ProdutoDTO;
import com.ecommerce.Loja.entidades.Categoria;
import com.ecommerce.Loja.entidades.Produto;
import com.ecommerce.Loja.repository.CategoriaRepository;
import com.ecommerce.Loja.repository.ProdutoRepository;

@Service
public class ProdutoService {

         private final CategoriaRepository categoriaRepository;
    
        private final ProdutoRepository produtoRepository;

        public ProdutoService(ProdutoRepository produtoRepository, CategoriaRepository categoriaRepository){
            this.produtoRepository = produtoRepository;
            this.categoriaRepository = categoriaRepository;
        }

         public List<Produto> buscarTodosProdutos(){
            return produtoRepository.findAll();
        }

    public List<Produto> buscarProdutosPorNome(String nome){
        return produtoRepository.findByNomeContainingIgnoreCase(nome);
    }

    public Produto AdicionandoProduto(ProdutoDTO produtoDTO){
        Categoria categoria = categoriaRepository.findById(produtoDTO.getCategoriaId())
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada!"));

        Produto produto = new Produto();
        produto.setNome(produtoDTO.getNome());
        produto.setDescricao(produtoDTO.getDescricao());
        produto.setPreco(produtoDTO.getPreco());
        produto.setCategoria(categoria);

        return produtoRepository.save(produto);
    }

    public Produto AtualizaProduto(Long id, Produto produtoAtualizado){
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        produto.setDescricao(produtoAtualizado.getDescricao());
        produto.setPreco(produtoAtualizado.getPreco());
        return produtoRepository.save(produto);
    }

    public void deletarProdutos(Long id){
        produtoRepository.deleteById(id);
    }
}

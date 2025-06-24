package com.ecommerce.Loja.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.Loja.DTO.ProdutoDTO;
import com.ecommerce.Loja.entidades.Produto;
import com.ecommerce.Loja.service.ProdutoService;

@RestController
@RequestMapping("/home")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService){
        this.produtoService = produtoService;
    }
    
     @GetMapping("/produtos")
    public List<Produto> listarProduto() {
        return produtoService.buscarTodosProdutos();
    }

    @GetMapping("/produtos/")
    public List<Produto> listarProdutoPorNome(@RequestParam String nome){
        return produtoService.buscarProdutosPorNome(nome);
    }

    @PostMapping("/produtos")
    public ResponseEntity<Produto> criarProduto(@RequestBody ProdutoDTO produtoDTO){
        Produto salvo = produtoService.AdicionandoProduto(produtoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/produtos/{id}")
    public ResponseEntity<Produto> atualizarProduto(@PathVariable Long id, @RequestBody Produto produto){
        Produto atualizado = produtoService.AtualizaProduto(id, produto);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/produtos/{id}")
    public ResponseEntity<Void> deletarProduto(@PathVariable Long id){
        produtoService.deletarProdutos(id);
        return ResponseEntity.noContent().build();
    }
}

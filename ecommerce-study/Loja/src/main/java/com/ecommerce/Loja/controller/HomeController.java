package com.ecommerce.Loja.controller;

import com.ecommerce.Loja.DTO.ProdutoDTO;
import com.ecommerce.Loja.entidades.Categoria;
import com.ecommerce.Loja.entidades.Produto;
import com.ecommerce.Loja.service.HomeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/home")
public class HomeController {

    private final HomeService homeService;

    public HomeController(HomeService homeService){
        this.homeService = homeService;
    }

    @GetMapping("/produtos")
    public List<Produto> listarProduto() {
        return homeService.buscarTodosProdutos();
    }

    @GetMapping("/produtos/")
    public List<Produto> listarProdutoPorNome(@RequestParam String nome){
        return homeService.buscarProdutosPorNome(nome);
    }

    @PostMapping("/produtos")
    public ResponseEntity<Produto> criarProduto(@RequestBody ProdutoDTO produtoDTO){
        Produto salvo = homeService.AdicionandoProduto(produtoDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/produtos/{id}")
    public ResponseEntity<Produto> atualizarProduto(@PathVariable Long id, @RequestBody Produto produto){
        Produto atualizado = homeService.AtualizaProduto(id, produto);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/produtos/{id}")
    public ResponseEntity<Void> deletarProduto(@PathVariable Long id){
        homeService.deletarProdutos(id);
        return ResponseEntity.noContent().build();
    }

    // ------- CATEGORIAS ----------

    @GetMapping("/categorias")
    public List<Categoria> listarCategorias(){
        return homeService.buscarTodasCategorias();
    }

    @GetMapping("/categorias/")
    public List<Categoria> categoriaListNome(@RequestParam String nome){
        return homeService.buscarCategoriaNome(nome);
    }

    @PostMapping("/categorias")
    public ResponseEntity<Categoria> criarCategoria(@RequestBody Categoria categoria){
        Categoria salvo = homeService.adicionarCategoria(categoria);
        return ResponseEntity.status(HttpStatus.CREATED).body(salvo);
    }

    @PutMapping("/categorias/{id}")
    public ResponseEntity<Categoria> atualizarCategoria(@PathVariable Long id, @RequestBody Categoria categoria){
        Categoria atualizado = homeService.atualizarCategoria(id, categoria);
        return ResponseEntity.ok(atualizado);
    }

    @DeleteMapping("/categorias/{id}")
    public ResponseEntity<Void> deletarCategoria(@PathVariable Long id){
        homeService.deletarCategoria(id);
        return ResponseEntity.noContent().build();
    }
}

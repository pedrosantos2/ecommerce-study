package com.ecommerce.Loja.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ecommerce.Loja.entidades.Categoria;
import com.ecommerce.Loja.repository.CategoriaRepository;

@Service
public class CategoriaService {
    
    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository){
        this.categoriaRepository = categoriaRepository;
    }

    public List<Categoria> buscarTodasCategorias(){
        return categoriaRepository.findAll();
    }

    public List<Categoria> buscarCategoriaNome(String nome){
        return categoriaRepository.findByNome(nome);
    }

    public Categoria adicionarCategoria(Categoria categoria){
        return categoriaRepository.save(categoria);
    }

    public Categoria atualizarCategoria(Long id, Categoria categoriaAtualizada){
        Categoria categoria = categoriaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Categoria não encontrada!"));
        categoria.setNome(categoriaAtualizada.getNome());
        return categoriaRepository.save(categoria);
    }

    public void deletarCategoria(Long id){
        categoriaRepository.deleteById(id);
    }
}

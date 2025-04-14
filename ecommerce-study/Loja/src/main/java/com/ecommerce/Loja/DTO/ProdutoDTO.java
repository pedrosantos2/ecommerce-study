package com.ecommerce.Loja.DTO;

import lombok.Data;

@Data
public class ProdutoDTO {
    private Long id;
    private String nome;
    private String descricao;
    private double preco;
    private Long categoriaId;
}

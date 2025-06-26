package com.ecommerce.Loja.entidades;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "access_count")
public class AccessCount {
    @Id
    private Long id = 1L;         

    private Long count = 0L;

   
}
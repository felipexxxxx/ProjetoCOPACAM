package com.copacam.reference_generator.Entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProdutoInNatura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String codigoCompleto;
    private String especie;
    private String apresentacao;
    private String gramatura;
    private String descricao; 
    private LocalDateTime dataInsercao;
    
     @PrePersist
    private void prePersist() {
        this.dataInsercao = LocalDateTime.now();
    }
}

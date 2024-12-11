package com.copacam.reference_generator.Entities;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
    public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Gera o ID automaticamente
    private Integer id;

    private String codigoCompleto;
    private String especie;
    private String apresentacao;
    private String estado;
    private String tipoConservacao;
    private String pecas;
    private String classificacao;
    private String pacote;
    private String caixa;
    private String descricao;

}

package com.copacam.reference_generator.Entities;
import jakarta.persistence.Entity;
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
    private Long id;

    private String codigoCompleto;
    private String especie;
    private String apresentacao;
    private String estado;
    private String condicao;
    private String pecas;
    private String classificacao;
    private String pacote;
    private String caixa;
    private String descricao;

}

package com.copacam.reference_generator.DTOs;

import lombok.Data;

@Data
public class ProdutoDTO {
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

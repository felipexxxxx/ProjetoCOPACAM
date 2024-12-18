package com.copacam.reference_generator.Services;

import com.copacam.reference_generator.DTOs.ProdutoDTO;
import com.copacam.reference_generator.DTOs.ProdutoInNaturaDTO;
import com.copacam.reference_generator.DTOs.ProdutoListResponseDTO;
import com.copacam.reference_generator.DTOs.ProdutoListResponseNaturaDTO;
import com.copacam.reference_generator.Entities.Produto;
import com.copacam.reference_generator.Entities.ProdutoInNatura;
import com.copacam.reference_generator.Repositories.ProdutoRepository;
import com.copacam.reference_generator.Repositories.ProdutoInNaturaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProdutoService {
    private final ProdutoRepository produtoRepository;
    private final ProdutoInNaturaRepository produtoInNaturaRepository;

    public Produto salvarProduto(ProdutoDTO produtoDTO) {
        String codigoCompleto = gerarCodigoCompletoRegular(produtoDTO);

        if (produtoRepository.findByCodigoCompleto(codigoCompleto).isPresent()) {
            throw new RuntimeException("Produto com esse código completo já existe.");
        }

        Produto produto = new Produto(
            null,
            codigoCompleto,
            produtoDTO.getEspecie(),
            produtoDTO.getApresentacao(),
            produtoDTO.getEstado(),
            produtoDTO.getTipoConservacao(),
            produtoDTO.getPecas(),
            produtoDTO.getClassificacao(),
            produtoDTO.getPacote(),
            produtoDTO.getCaixa(),
            produtoDTO.getDescricao(),
            produtoDTO.getDataInsercao()
            
        );

        return produtoRepository.save(produto);
    }

    public ProdutoInNatura salvarProdutoInNatura(ProdutoInNaturaDTO produtoInNaturaDTO) {
        String codigoCompleto = gerarCodigoCompletoInNatura(produtoInNaturaDTO);

        if (produtoInNaturaRepository.findByCodigoCompleto(codigoCompleto).isPresent()) {
            throw new RuntimeException("Produto IN NATURA com esse código completo já existe.");
        }

        ProdutoInNatura produtoInNatura = new ProdutoInNatura(
            null,
            codigoCompleto,
            produtoInNaturaDTO.getEspecie(),
            produtoInNaturaDTO.getApresentacao(),
            produtoInNaturaDTO.getGramatura(),
            produtoInNaturaDTO.getDescricao(),
            produtoInNaturaDTO.getDataInsercao()

        );

        return produtoInNaturaRepository.save(produtoInNatura);
    }

    public List<ProdutoListResponseDTO> listarProdutos() {
        return produtoRepository.findAll()
                .stream()
                .map(produto -> new ProdutoListResponseDTO(produto.getCodigoCompleto(), produto.getDescricao()))
                .collect(Collectors.toList());
    }

    public List<ProdutoListResponseNaturaDTO> listarProdutosInNatura() {
        return produtoInNaturaRepository.findAll()
                .stream()
                .map(produto -> new ProdutoListResponseNaturaDTO(produto.getCodigoCompleto(), produto.getDescricao()))
                .collect(Collectors.toList());
        
    }

    private String gerarCodigoCompletoRegular(ProdutoDTO dto) {
        return String.format(
            "%s %s %s %s %s %s %s %s",
            dto.getEspecie(),
            dto.getApresentacao(),
            dto.getEstado(),
            dto.getTipoConservacao(),
            dto.getPecas() != null ? dto.getPecas() : "",
            dto.getClassificacao() != null ? dto.getClassificacao() : "",
            dto.getPacote() != null ? dto.getPacote() : "",
            dto.getCaixa() != null ? dto.getCaixa() : ""
        ).trim();
    }

    private String gerarCodigoCompletoInNatura(ProdutoInNaturaDTO dto) {
        String gramatura = dto.getGramatura() != null ? dto.getGramatura().trim() : "0";
        gramatura = gramatura.length() > 3 ? gramatura.substring(0, 3) : gramatura; // Limita a 3 dígitos
        gramatura = String.format("%03d", Integer.parseInt(gramatura)); // Preenche com zeros à esquerda
        return String.format(
            "%s 0 0000000000000000000000 %s",
            dto.getEspecie(),
            gramatura
        ).trim();
    }
}

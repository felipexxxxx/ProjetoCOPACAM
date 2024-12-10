package com.copacam.reference_generator.Services;

import com.copacam.reference_generator.Entities.Produto;
import com.copacam.reference_generator.Repositories.ProdutoRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProdutoService {
    private final ProdutoRepository produtoRepository;

    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    public Optional<Produto> consultarPorCodigo(String codigoCompleto) {
        return produtoRepository.findByCodigoCompleto(codigoCompleto);
    }

    public Produto salvarProduto(Produto produto) {
        Optional<Produto> existente = produtoRepository.findByCodigoCompleto(produto.getCodigoCompleto());
        if (existente.isPresent()) {
            throw new RuntimeException("Produto com esse código completo já existe.");
        }
        return produtoRepository.save(produto);
    }
}

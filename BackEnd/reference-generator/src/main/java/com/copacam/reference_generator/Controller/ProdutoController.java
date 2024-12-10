package com.copacam.reference_generator.Controller;

import com.copacam.reference_generator.Entities.Produto;
import com.copacam.reference_generator.Services.ProdutoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {
    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping("/{codigoCompleto}")
    public ResponseEntity<?> consultarProduto(@PathVariable String codigoCompleto) {
        Optional<Produto> produto = produtoService.consultarPorCodigo(codigoCompleto);
        if (produto.isPresent()) {
            return ResponseEntity.ok(produto.get());
        }
        return ResponseEntity.status(404).body("Produto não encontrado.");
    }

    @PostMapping
    public ResponseEntity<?> salvarProduto(@RequestBody Produto produto) {
        try {
            Produto salvo = produtoService.salvarProduto(produto);
            return ResponseEntity.ok(salvo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}

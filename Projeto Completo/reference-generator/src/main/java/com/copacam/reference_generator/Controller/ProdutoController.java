package com.copacam.reference_generator.Controller;

import com.copacam.reference_generator.DTOs.ProdutoListResponseDTO;
import com.copacam.reference_generator.DTOs.ProdutoListResponseNaturaDTO;
import com.copacam.reference_generator.DTOs.ProdutoInNaturaDTO;
import com.copacam.reference_generator.Entities.ProdutoInNatura;
import com.copacam.reference_generator.DTOs.ProdutoDTO;
import com.copacam.reference_generator.Entities.Produto;
import com.copacam.reference_generator.Services.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
@RequestMapping("/produtos")
@RequiredArgsConstructor
public class ProdutoController {
    private final ProdutoService produtoService;

    @PostMapping
    public ResponseEntity<?> salvarProduto(@RequestBody ProdutoDTO produtoDTO) {
        try {
            Produto salvo = produtoService.salvarProduto(produtoDTO);
            return ResponseEntity.ok(salvo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/natura")
    public ResponseEntity<?> salvarProdutoInNatura(@RequestBody ProdutoInNaturaDTO produtoInNaturaDTO) {
        try {
            ProdutoInNatura salvo = produtoService.salvarProdutoInNatura(produtoInNaturaDTO);
            return ResponseEntity.ok(salvo);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ProdutoListResponseDTO>> listarProdutos() {
        return ResponseEntity.ok(produtoService.listarProdutos());
    }

    @GetMapping("/natura")
    public ResponseEntity<List<ProdutoListResponseNaturaDTO>> listarProdutosInNatura() {
        return ResponseEntity.ok(produtoService.listarProdutosInNatura());
    }
}

package com.copacam.reference_generator.Controller;

import com.copacam.reference_generator.DTOs.ProdutoListResponseDTO;
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
            System.out.println("Código completo recebido: " + produtoDTO.getCodigoCompleto());

            Map<String, Object> resposta = new HashMap<>();
            resposta.put("mensagem", "Produto criado com sucesso!");
            resposta.put("produto", salvo);

            return ResponseEntity.ok(resposta);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<ProdutoListResponseDTO>> listarProdutos() {
        List<ProdutoListResponseDTO> produtos = produtoService.listarProdutos();
        return ResponseEntity.ok(produtos);
    }
}

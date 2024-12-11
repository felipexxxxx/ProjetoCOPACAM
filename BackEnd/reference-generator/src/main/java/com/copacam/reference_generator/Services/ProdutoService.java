package com.copacam.reference_generator.Services;

import com.copacam.reference_generator.DTOs.ProdutoDTO;
import com.copacam.reference_generator.DTOs.ProdutoListResponseDTO;
import com.copacam.reference_generator.Entities.Produto;
import com.copacam.reference_generator.Repositories.ProdutoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProdutoService {
    private final ProdutoRepository produtoRepository;

    public Produto salvarProduto(ProdutoDTO produtoDTO) {
        // Gera o código completo de acordo com as regras de formatação
        String codigoCompleto = gerarCodigoCompleto(produtoDTO);

        if (produtoRepository.findByCodigoCompleto(codigoCompleto).isPresent()) {
            throw new RuntimeException("Produto com esse código completo já existe.");
        }

        Produto produto = mapToEntity(produtoDTO);
        produto.setCodigoCompleto(codigoCompleto); // Define o código gerado

        return produtoRepository.save(produto);
    }

    public List<ProdutoListResponseDTO> listarProdutos() {
        return produtoRepository.findAll()
                .stream()
                .map(produto -> new ProdutoListResponseDTO(produto.getCodigoCompleto(), produto.getDescricao()))
                .collect(Collectors.toList());
    }

    private Produto mapToEntity(ProdutoDTO dto) {
        // Validar campos obrigatórios para produtos não IN NATURA
        if (!"IN NATURA".equalsIgnoreCase(dto.getApresentacao())) {
            if (dto.getEspecie() == null || dto.getApresentacao() == null || dto.getEstado() == null ||
                dto.getTipoConservacao() == null || dto.getPecas() == null || dto.getClassificacao() == null ||
                dto.getPacote() == null || dto.getCaixa() == null || dto.getDescricao() == null) {
                throw new RuntimeException("Todos os campos são obrigatórios");
            }
        }
    
        // Mapear para entidade Produto
        Produto produto = new Produto(
            null, // ID autogerado
            null, // Código completo será gerado
            dto.getEspecie(),
            dto.getApresentacao(),
            dto.getEstado(),
            dto.getTipoConservacao(),
            dto.getPecas(),
            dto.getClassificacao(),
            dto.getPacote(),
            dto.getCaixa(),
            dto.getDescricao()
        );
    
        // Preenche valores padrão para campos vazios no caso de IN NATURA
        if ("IN NATURA".equalsIgnoreCase(dto.getApresentacao())) {
            produto.setEstado("0");
            produto.setTipoConservacao("0");
            produto.setPecas("0");
            produto.setClassificacao("0");
            produto.setPacote("0");
            produto.setCaixa("0");
        }
    
        return produto;
    }
    
    private String gerarCodigoCompleto(ProdutoDTO dto) {
        if ("IN NATURA".equalsIgnoreCase(dto.getApresentacao())) {
            // Usar a gramatura como último componente do código
            String gramatura = dto.getDescricao(); // Campo "descricao" utilizado como gramatura
            gramatura = gramatura != null ? gramatura.trim() : "0";
            gramatura = gramatura.length() > 3 ? gramatura.substring(0, 3) : gramatura; // Limita a 3 dígitos
            gramatura = String.format("%03d", Integer.parseInt(gramatura)); // Preenche com zeros à esquerda
            return (dto.getEspecie() + "0" + "0".repeat(24) + gramatura).substring(0, 28);
        }
    
        // Para outros casos, gerar normalmente o código com validação
        return padEnd(
            dto.getEspecie() +
            dto.getApresentacao() +
            dto.getEstado()+
            dto.getTipoConservacao() +
            (dto.getPecas() != null ? dto.getPecas() : "0") +
            (dto.getClassificacao() != null ? dto.getClassificacao() : "0") +
            (dto.getPacote() != null ? dto.getPacote() : "0") +
            (dto.getCaixa() != null ? dto.getCaixa() : "0"),
            28,
            '0'
        ).substring(0, 28);
    }
    
    
    

    private String padEnd(String input, int length, char padChar) {
        StringBuilder sb = new StringBuilder(input);
        while (sb.length() < length) {
            sb.append(padChar);
        }
        return sb.toString();
    }
    }
    
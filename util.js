function formatarClassificacao(classificacao) {
    // Remove espaços ao redor da entrada
    const entrada = classificacao.trim();

    // Verifica se a entrada está no formato "50/80"
    if (/^\d{2,3}\/\d{2,3}$/.test(entrada)) {
        return `(${entrada})`; // Normaliza para "(50/80)"
    }

    // Verifica se a entrada está no formato "(50/80)"
    if (/^\(\d{2,3}\/\d{2,3}\)$/.test(entrada)) {
        return entrada; // Retorna como "(50/80)"
    }
    return "Inválido"; // Retorna "Inválido" para entradas fora do padrão
}

function formatarPacote(pacote) {
    // Remove espaços e verifica se está em maiúsculas
    const entrada = pacote.trim();
    if (entrada === entrada.toUpperCase()) {
        // Verifica se termina com "G" (gramas)
        if (entrada.endsWith("G")) {
            const valor = parseInt(entrada.replace("G", ""), 10);
            if (!isNaN(valor) && valor > 0 && valor < 1000) {
                return `${valor}G`; // Retorna como "150G", "200G", etc.
            }
        }
        // Verifica se termina com "KG" (quilogramas)
        else if (entrada.endsWith("KG")) {
            const valor = parseInt(entrada.replace("KG", ""), 10);
            if (!isNaN(valor) && valor > 0) {
                return `${valor}KG`; // Retorna como "5KG", "1KG", etc.
            }
        }
    }
    return "Inválido"; // Retorna "Inválido" para formatos inesperados
}

function formatarCaixa(codigo) {
    // Remove espaços e verifica se está em maiúsculas e termina com "KG"
    const entrada = codigo.trim();
    if (entrada === entrada.toUpperCase() && entrada.endsWith("KG")) {
        const valor = parseInt(entrada.replace("KG", ""), 10); // Remove "KG" e converte para número
        if (!isNaN(valor) && valor > 0) {
            return `${valor}KG`; // Exibe como "5KG", "1KG", etc.
        }
    }
    return "Inválido"; // Retorna "Inválido" para formatos inesperados
}

function converterClassificacaoParaCodigo(classificacao) {
    const partes = classificacao.replace(/[()]/g, "").split("/");
    if (partes.length === 2) {
        const parte1 = partes[0];
        const parte2 = partes[1];

        // Lógica para determinar o formato correto
        if (parte1.length === 2 && parte2.length === 2) {
            return `00${parte1}${parte2}`;
        } else if (parte1.length === 2 && parte2.length === 3) {
            return `0${parte1}${parte2}`;
        } else if (parte1.length === 3 && parte2.length === 3) {
            return `${parte1}${parte2}`;
        }
    }
  
    // Retorna uma classificação padrão indicando erro
    return "Inválido";

}
function converterCaixaParaCodigo(caixa) {
    if (caixa.toUpperCase().endsWith("KG")) {
        const valor = parseInt(caixa.toUpperCase().replace("KG", ""), 10);
        return valor.toString().padStart(2, "0"); // Retorna sempre 2 dígitos
    }
    return "Inválido"; // Retorna padrão se o valor for inválido
}

function formatarPecasPorPacote(input) {
    const entrada = input.trim();
    const regex = /^\d{1,4}\s?[aA]\s?\d{1,4}$/; // Ex.: "50 a 60", "900 a 1000"
    if (regex.test(entrada)) {
        const valores = entrada.match(/\d+/g); // Extrai os números
        const inicio = parseInt(valores[0], 10); // Primeiro número
        const fim = parseInt(valores[1], 10);   // Segundo número

        // Verifica se o início é menor ou igual ao fim
        if (inicio < fim) {
            return `${inicio} a ${fim}`;
        } else {
            return "Inválido"; // Retorna inválido se o início for maior que o fim
        }
    }
    return "Inválido"; // Retorna inválido se o formato não for atendido
}

function converterPecasPacoteParaCodigo(pecas) {
    const partes = pecas.replace(/[()]/g, "").split(" a "); // Remove parênteses e separa por "a"
    if (partes.length === 2) {
        const parte1 = partes[0].trim(); // Número inicial
        const parte2 = partes[1].trim(); // Número final

        // Verifica se as partes são válidas
        if (!isNaN(parte1) && !isNaN(parte2)) {
            const inicio = parseInt(parte1, 10); // Converte o número inicial para inteiro
            const fim = parseInt(parte2, 10);    // Converte o número final para inteiro

            // Verifica se o número inicial é menor ou igual ao número final
            if (inicio < fim) {
                // Concatena os dois números e preenche à esquerda com zeros para ter exatamente 8 dígitos
                const codigo = `${inicio.toString()}${fim.toString()}`.padStart(8, "0");
                return codigo;
            } else {
                return "Inválido"; // Retorna inválido se o número inicial for maior que o final
            }
        }
    }

    // Retorna uma classificação padrão indicando erro
    return "Inválido";
}



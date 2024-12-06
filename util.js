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


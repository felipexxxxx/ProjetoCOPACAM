const especieMap = { "01": "CAM CINZA" };
    const apresentacaoMap = {
        "0": "INT",
        "1": "S/CABEÇA",
        "2": "DESC PUD TAIL OFF",
        "3": "DESC PUD TAIL ON",
        "4": "DESC PPV TAIL OFF",
        "5": "DESC PPV TAIL ON",
        "6": "DESC PED TAIL OFF",
        "7": "DESC PED TAIL ON"
    };
    const condicaoMap = { "0": "CRU", "1": "COZ" };
    const estadoMap = { "000": "IN NATURA", "100": "CONG IQF", "110": "CONG IQF10", "115": "CONG IQF15", "120": "CONG IQF20", "200": "CONG BLOCO", "210": "CONG BLOCO10", "215": "CONG BLOCO15", "220": "CONG BLOCO20"  };
    const pacoteMap = {
        "00150": "150G",
        "00200": "200G",
        "00300": "300G",
        "01000": "1KG",
        "05000": "5KG",
    };
    const caixaMap = {
        "10":"10KG",
        "08":"8KG",
        "06":"6KG"
        
    }


// Função para configurar os filtros dinamicamente
function preencherFiltros() {
    preencherFiltroDinamico("dropdownEspecie", especieMap, "descricaoEspecie");
    preencherFiltroDinamico("dropdownApresentacao", apresentacaoMap, "descricaoApresentacao");
    preencherFiltroDinamico("dropdownCondicao", condicaoMap, "descricaoCondicao");
    preencherFiltroDinamico("dropdownEstado", estadoMap, "descricaoEstado");
    preencherFiltroDinamico("dropdownPacote", pacoteMap, "descricaoPacote");
    preencherFiltroDinamico("dropdownCaixa", caixaMap, "descricaoCaixa");
}

// Função genérica para preencher os filtros
function preencherFiltroDinamico(dropdownId, optionsMap, inputId) {
    const dropdown = document.getElementById(dropdownId);
    Object.entries(optionsMap).forEach(([key, value]) => {
        const li = document.createElement("li");
        li.innerHTML = `<a class="dropdown-item" href="#" onclick="selecionarFiltro('${inputId}', '${value}')">${value}</a>`;
        dropdown.appendChild(li);
    });
}

// Função para selecionar um valor no filtro
function selecionarFiltro(campoId, valor) {
    const campo = document.getElementById(campoId);
    campo.value = valor; // Define o valor no campo
    AtualizarTabelaReferencia(); // Atualiza a tabela
    AtualizarTabelaDescricaoCompleta(); // Atualiza a tabela
}

// Configuração ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    preencherFiltros();
});
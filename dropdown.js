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
    const estadoMap = { "000": "IN NATURA", "100": "CONG IQF", "110": "CONG IQF 10", "115": "CONG IQF 15", "120": "CONG IQF 20", "200": "CONG BLOCO", "210": "CONG BLOCO 10", "215": "CONG BLOCO 15"  };
    const pacoteMap = {
        "00000": "Inválido",
        "00100": "100G",
        "00150": "150G",
        "00200": "200G",
        "00300": "300G",
        "00400": "400G",
        "00500": "500G",
        "00600": "600G",
        "00700": "700G",
        "00800": "800G",
        "00900": "900G",
        "01000": "1KG",
        "02000": "2KG",
        "03000": "3KG",
        "04000": "4KG",
        "05000": "5KG",
        "06000": "6KG",
        "07000": "7KG",
        "08000": "8KG",
        "09000": "9KG",
        "10000": "10KG",
    };


// Função para configurar os filtros dinamicamente
function preencherFiltros() {
    preencherFiltroDinamico("dropdownEspecie", especieMap, "descricaoEspecie");
    preencherFiltroDinamico("dropdownApresentacao", apresentacaoMap, "descricaoApresentacao");
    preencherFiltroDinamico("dropdownCondicao", condicaoMap, "descricaoCondicao");
    preencherFiltroDinamico("dropdownEstado", estadoMap, "descricaoEstado");
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
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
    const estadoMap = { "0": "IN NATURA", "1": "CONG IQF", "2": "CONG BLOCO" };
    const pacoteMap = {
        "0000": "Inválido",
        "0100": "100G",
        "0150": "150G",
        "0200": "200G",
        "0300": "300G",
        "0400": "400G",
        "0500": "500G",
        "0600": "600G",
        "0700": "700G",
        "0800": "800G",
        "0900": "900G",
        "1000": "1KG",
        "2000": "2KG",
        "3000": "3KG",
        "4000": "4KG",
        "5000": "5KG",
        "6000": "6KG",
        "7000": "7KG",
        "8000": "8KG",
        "9000": "9KG",
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
function AtualizarTabelaReferencia() {
    const especieInput = document.getElementById("descricaoEspecie").value || "N/A";
    const apresentacaoInput = document.getElementById("descricaoApresentacao").value || "N/A";
    const condicaoInput = document.getElementById("descricaoCondicao").value || "N/A";
    const estadoInput = document.getElementById("descricaoEstado").value || "N/A";
    const pecasInput = document.getElementById("descricaoPecas").value || "N/A";
    const classificacaoInput = document.getElementById("descricaoClassificacao").value || "N/A";
    const pacoteInput = document.getElementById("descricaoPacote").value || "N/A";
    const caixaInput = document.getElementById("descricaoCaixa").value || "N/A";

    const especie = Object.keys(especieMap).find(key => especieMap[key] === especieInput) || "Inválido";
    const apresentacao = Object.keys(apresentacaoMap).find(key => apresentacaoMap[key] === apresentacaoInput) || "Inválido";
    const condicao = Object.keys(condicaoMap).find(key => condicaoMap[key] === condicaoInput) || "Inválido";
    const estado = Object.keys(estadoMap).find(key => estadoMap[key] === estadoInput) || "Inválido";
    const pecas = converterPecasPacoteParaCodigo(pecasInput);
    const classificacao = converterClassificacaoParaCodigo(classificacaoInput);
    const pacote = Object.keys(pacoteMap).find(key =>  pacoteMap[key] === pacoteInput) || "Inválido";
    const caixa = converterCaixaParaCodigo(caixaInput);

    const codigoCompleto = `${especie}${apresentacao}${condicao}${estado}${pecas}${classificacao}${pacote}${caixa}`;
    const tabela = document.getElementById("tabelaDescricao");
    tabela.innerHTML = `
        <tr>
            <td>${especie}</td>
            <td>${apresentacao}</td>
            <td>${condicao}</td>
            <td>${estado}</td>
            <td>${pecas}</td>
            <td>${classificacao}</td>
            <td>${pacote}</td>
            <td>${caixa}</td>
            <td>${codigoCompleto}</td>
        </tr>
    `;
}

   // Função para atualizar a tabela de Descrição Completa
function AtualizarTabelaDescricaoCompleta() {
    // Captura os valores preenchidos nos campos
    const especie = document.getElementById("descricaoEspecie").value || "Inválido";
    const apresentacao = document.getElementById("descricaoApresentacao").value || "Inválido";
    const condicao = document.getElementById("descricaoCondicao").value || "Inválido";
    const estado = document.getElementById("descricaoEstado").value || "Inválido";
    const pecasInput = document.getElementById("descricaoPecas").value || "Inválido";
    const classificacaoInput = document.getElementById("descricaoClassificacao").value || "Inválido";
    const pacote = document.getElementById("descricaoPacote").value || "Inválido";
    const caixaInput = document.getElementById("descricaoCaixa").value || "Inválido";

    const pecas = formatarPecasPorPacote(pecasInput);
    const classificacao = formatarClassificacao(classificacaoInput);
    const caixa = formatarCaixa(caixaInput); // Garante que somente códigos válidos sejam formatados
    // Atualiza a nova tabela
    const descricaoCompleta = `${especie} ${apresentacao} ${condicao} ${estado} ${pecas} ${classificacao} PAC ${pacote} ${caixa}`
    tabelaDescricaoCompleta.innerHTML = `
        <tr>
            <td>${descricaoCompleta}</td>
        </tr>
    `;
}

// Adiciona eventos aos campos de entrada para atualizar a nova tabela
document.querySelectorAll("#descricaoForm input").forEach(input => {
    input.addEventListener("input", AtualizarTabelaDescricaoCompleta);
});

    
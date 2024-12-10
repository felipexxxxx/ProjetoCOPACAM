function AtualizarTabelaReferencia() {
    const especieInput = document.getElementById("descricaoEspecie").value || "N/A";
    const apresentacaoInput = document.getElementById("descricaoApresentacao").value || "N/A";
    const condicaoInput = document.getElementById("descricaoCondicao").value || "N/A";
    const estadoInput = document.getElementById("descricaoEstado").value || "N/A";
    const pecasMinimaInput = document.getElementById("pecasMinima").value || "N/A";
    const pecasMaximaInput = document.getElementById("pecasMaxima").value || "N/A";
    const classificacaoMinimaInput = document.getElementById("classificacaoMinima").value || "N/A";
    const classificacaoMaximaInput = document.getElementById("classificacaoMaxima").value || "N/A";
    const pacoteInput = document.getElementById("descricaoPacote").value || "N/A";
    const caixaInput = document.getElementById("descricaoCaixa").value || "N/A";

    const pecasCodigo = converterPecasParaCodigo(pecasMinimaInput, pecasMaximaInput);
    const classificacaoCodigo = converterClassificacaoParaCodigo(classificacaoMinimaInput, classificacaoMaximaInput);
    const especie = Object.keys(especieMap).find(key => especieMap[key] === especieInput) || "Inválido";
    const apresentacao = Object.keys(apresentacaoMap).find(key => apresentacaoMap[key] === apresentacaoInput) || "Inválido";
    const condicao = Object.keys(condicaoMap).find(key => condicaoMap[key] === condicaoInput) || "Inválido";
    const estado = Object.keys(estadoMap).find(key => estadoMap[key] === estadoInput) || "Inválido";
    const pacote = Object.keys(pacoteMap).find(key =>  pacoteMap[key] === pacoteInput) || "Inválido";
    const caixa = Object.keys(caixaMap).find(key => caixaMap[key] === caixaInput) || "Inválido";

    const codigoCompleto = `${especie}${apresentacao}${condicao}${estado}${pecasCodigo}${classificacaoCodigo}${pacote}${caixa}`;
    const tabela = document.getElementById("tabelaDescricao");
    tabela.innerHTML = `
        <tr>
            <td>${especie}</td>
            <td>${apresentacao}</td>
            <td>${condicao}</td>
            <td>${estado}</td>
            <td>${pecasCodigo}</td>
            <td>${classificacaoCodigo}</td>
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
    const pecasMinimaInput = document.getElementById("pecasMinima").value || "Inválido";
    const pecasMaximaInput = document.getElementById("pecasMaxima").value || "Inválido";
    const classificacaoMinimaInput = document.getElementById("classificacaoMinima").value || "Inválido";
    const classificacaoMaximaInput = document.getElementById("classificacaoMaxima").value || "Inválido";
    const pacoteInput = document.getElementById("descricaoPacote").value || "Inválido";
    const caixaInput = document.getElementById("descricaoCaixa").value || "Inválido";

    const pecasCodigo = formatarPecasPorPacote(pecasMinimaInput, pecasMaximaInput);
    const classificacaoCodigo = formatarClassificacao(classificacaoMinimaInput, classificacaoMaximaInput);
    const caixa = formatarCaixa(caixaInput);
    const pacote = formatarPacote(pacoteInput) // Garante que somente códigos válidos sejam formatados
    // Atualiza a nova tabela
    const descricaoCompleta = `${especie} ${apresentacao} ${condicao} ${estado} ${pecasCodigo} ${classificacaoCodigo} ${pacote} ${caixa}`
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

    
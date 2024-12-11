document.getElementById("criarProduto").addEventListener("click", async () => {
    try {
        // Exibir aviso de confirmação
        const confirmacao = confirm("Você tem certeza de que deseja criar este produto?");
        if (!confirmacao) {
            return; // Cancela a criação se o usuário não confirmar
        }

    
        const especie = Object.keys(especieMap).find(key => especieMap[key] === document.getElementById("descricaoEspecie").value);
        const apresentacao = Object.keys(apresentacaoMap).find(key => apresentacaoMap[key] === document.getElementById("descricaoApresentacao").value);
        const estado = Object.keys(estadoMap).find(key => estadoMap[key] === document.getElementById("descricaoEstado").value);
        const tipoConservacao = Object.keys(condicaoMap).find(key => condicaoMap[key] === document.getElementById("descricaoCondicao").value);
        const pecas = converterPecasParaCodigo(
            document.getElementById("pecasMinima").value,
            document.getElementById("pecasMaxima").value
        );
        const classificacao = converterClassificacaoParaCodigo(
            document.getElementById("classificacaoMinima").value,
            document.getElementById("classificacaoMaxima").value
        );
        const pacote = Object.keys(pacoteMap).find(key => pacoteMap[key] === document.getElementById("descricaoPacote").value);
        const caixa = Object.keys(caixaMap).find(key => caixaMap[key] === document.getElementById("descricaoCaixa").value);
        const descricao = document.getElementById("tabelaDescricaoCompleta")?.innerText || "";

        // Validação para garantir que todos os campos sejam numéricos
        const camposNumericos = [
            especie,
            apresentacao,
            estado,
            tipoConservacao,
            pecas,
            classificacao,
            pacote,
            caixa
        ];

        const camposInvalidos = camposNumericos.some(campo => isNaN(campo) || campo.trim() === "");

        if (camposInvalidos) {
            alert("Todos os campos devem ser preenchidos corretamente!");
            return;
        }

        // Preenchimento específico para IN NATURA
        let codigoCompleto;
        if (apresentacao === "0") { // IN NATURA
            const gramatura = document.getElementById("descricaoGramatura")?.value;

            // Validação para garantir que a gramatura seja numérica e limitada a 3 dígitos
            const gramaturaValida = gramatura.replace(/[^0-9]/g, "").padStart(3, '0').slice(-3);
            codigoCompleto = `${especie}${apresentacao}0000000000000000000000${gramaturaValida}`;
        } else {
            codigoCompleto = `${especie}${apresentacao}${estado}${tipoConservacao}${pecas}${classificacao}${pacote}${caixa}`.padEnd(28, '0');
        }

        const produto = {
            codigoCompleto,
            especie,
            apresentacao,
            estado,
            tipoConservacao,
            pecas,
            classificacao,
            pacote,
            caixa,
            descricao
        };

        const response = await fetch("http://localhost:8080/produtos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto),
        });

        if (response.ok) {
            alert("Produto criado com sucesso!");
        } else {
            alert(`Erro ao criar produto: ${await response.text()}`);
        }
    } catch (err) {
        alert(`Erro no formulário ou ao se comunicar com o servidor: ${err.message}`);
    }
});

 // Carrega os dados ao abrir a página
 async function carregarCamaroes() {
    try {
        const response = await fetch("http://localhost:8080/produtos");
        if (!response.ok) {
            throw new Error("Erro ao buscar produtos: " + response.statusText);
        }

        const produtos = await response.json();
        const tabelaProdutos = document.getElementById("tabelaProdutos");
        tabelaProdutos.innerHTML = ""; // Limpa a tabela

        produtos.forEach(produto => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${produto.codigoCompleto}</td>
                <td>${produto.descricao}</td>
            `;
            tabelaProdutos.appendChild(row);
        });
    } catch (error) {
        alert("Erro ao buscar camarões: " + error.message);
    }
}

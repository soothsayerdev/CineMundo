// Função auxiliar para gerar código aleatório
function gerarCodigoPix() {
    return '00020126580014BR.GOV.BCB.PIX0136' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Função auxiliar para "Enviar" SPAM
function enviarSpam(tipo, dados) {
    console.log("\n==================================================");
    console.log(`[SIMULAÇÃO DE ENVIO - ${tipo}]`);
    console.log(`PARA: ${dados.nome} (CPF: ${dados.cpf})`);
    console.log(`MENSAGEM: ${dados.mensagem}`);
    if (dados.detalhes) {
        console.log(`DETALHES: ${dados.detalhes}`);
    }
    console.log("==================================================\n");
}

exports.finalizarCompra = (req, res) => {
    const { nome, cpf, valor, descricao, metodoPagamento } = req.body;
    
    const dataAtual = new Date().toLocaleDateString('pt-BR');
    const horaAtual = new Date().toLocaleTimeString('pt-BR');

    // 5. Criar código PIX ou processar cartão
    let respostaCliente = {};
    let mensagemInicial = "";

    if (metodoPagamento === 'pix') {
        const pixCode = gerarCodigoPix();
        respostaCliente = { 
            message: "Compra iniciada! Use o código PIX gerado.", 
            pixCode: pixCode 
        };
        mensagemInicial = `Pagamento Pendente via PIX. Código: ${pixCode}`;
    } else {
        respostaCliente = { message: "Dados do cartão recebidos. Processando..." };
        mensagemInicial = "Pagamento em análise via Cartão de Crédito.";
    }

    // 3. Envio do SPAM imediato (Confirmação de Pedido)
    enviarSpam("EMAIL/SMS", {
        nome: nome,
        cpf: cpf,
        mensagem: "Recebemos o seu pedido de compra!",
        detalhes: `Item: ${descricao} | Valor: R$ ${valor} | Data: ${dataAtual} às ${horaAtual} | Status: ${mensagemInicial}`
    });

    // Responder ao Frontend para não travar o site
    res.send(respostaCliente);

    // 6. O DRAMA - Temporizador de 15 minutos (simulado aqui como 15 segundos para testares, muda para 900000 para 15 min)
    // 15 minutos = 15 * 60 * 1000 = 900000 milissegundos
    const tempoDrama = 15 * 60 * 1000; 
    
    setTimeout(() => {
        enviarSpam("EMAIL/SMS - FALHA DRAMÁTICA", {
            nome: nome,
            cpf: cpf,
            mensagem: "⚠️ URGENTE: OS SEUS INGRESSOS FORAM PERDIDOS! ⚠️",
            detalhes: `Infelizmente o tempo de 15 minutos expirou e o pagamento de R$ ${valor} para "${descricao}" não foi identificado. O sistema cedeu o seu lugar para outra pessoa. Tente ser mais rápido da próxima vez!`
        });
    }, tempoDrama);
};
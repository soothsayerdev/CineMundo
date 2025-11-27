// mostrarFilmes();
addEventListener();



// conexao com banco de dados
const { connectToDatabase, sql } = require('./config/database');

async function testar() {
    try {
        // 1. Tenta abrir a conexão
        const pool = await connectToDatabase();
        
        // 2. Faz uma pergunta simples ao banco (Lista os filmes)
        console.log("🔍 A procurar filmes no banco...");
        const resultado = await pool.request().query('SELECT * FROM Filmes');
        
        // 3. Mostra o resultado
        console.log("🎉 Sucesso! Filmes encontrados:");
        console.table(resultado.recordset); // Mostra numa tabela bonita no terminal

        // Fecha a conexão (opcional num script de teste, mas boa prática)
        pool.close();

    } catch (erro) {
        console.error("❌ Algo correu mal:", erro.message);
    }
}

testar();
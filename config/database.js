// Importamos a biblioteca 'mssql' que permite ao Node.js falar com o SQL Server
const sql = require('mssql');

// Importamos o 'dotenv' para tentar ler as variáveis do arquivo .env (segurança)
require('dotenv').config();

// ==============================================================================
// 1. CONFIGURAÇÃO DA LIGAÇÃO
// Aqui definimos os dados de acesso (Login, Senha, Endereço do Servidor)
// ==============================================================================
const config = {
    // Utilizador do SQL Server. 'sa' é o administrador padrão (System Administrator)
    // Se não houver variável de ambiente, usa 'sa'
    user: process.env.DB_USER || 'BD24477',

    // A SENHA que definiste ao instalar o SQL Server.
    // ⚠️ IMPORTANTE: Se não usares o ficheiro .env, troca 'sua_senha_aqui' pela tua senha real.
    password: process.env.DB_PASSWORD || 'Frattini2001@2024',

    // O endereço do servidor. 'localhost' significa que o banco está no teu próprio computador.
    server: process.env.DB_HOST || 'regulus.cotuca.unicamp.br',

    // O nome exato da base de dados que criámos no VSCode
    database: process.env.DB_NAME || 'CineMundo',

    // Opções extra obrigatórias para ligações locais modernas e Azure
    options: {
        encrypt: false, // Deixa 'false' para uso local. Se fosse no Azure, seria 'true'.
        
        // 'true' aceita certificados auto-assinados (comum em desenvolvimento local)
        // Evita o erro: "Self-signed certificate error"
        trustServerCertificate: true, 
        
        // Ajuda a evitar erros de cálculos matemáticos em queries complexas
        enableArithAbort: true
    },
    
    // A porta padrão do SQL Server é 1433.
    port: 1433 
};

// ==============================================================================
// 2. FUNÇÃO DE LIGAÇÃO
// Esta função será chamada pelos teus Controllers para abrir a conexão
// ==============================================================================
async function connectToDatabase() {
    try {
        // Tenta conectar usando a configuração acima
        const pool = await sql.connect(config);
        console.log("✅ Conectado ao SQL Server com sucesso!");
        
        // Retorna a "pool" (o canal de ligação) para que possas fazer as perguntas (queries)
        return pool;
    } catch (err) {
        // Se der erro (ex: senha errada), mostra o erro no terminal
        console.error("❌ Erro ao conectar ao SQL Server:", err);
        
        // Lança o erro para que o programa saiba que falhou
        throw err;
    }
}

// ==============================================================================
// 3. EXPORTAÇÃO
// Disponibilizamos o objeto 'sql' e a função de conectar para o resto do projeto
// ==============================================================================
module.exports = {
    sql,
    connectToDatabase
};
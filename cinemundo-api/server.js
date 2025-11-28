const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectToDatabase } = require('./config/database'); 

const app = express();
const PORT = process.env.PORT || 3000;

// 1. Configurações Básicas (Middlewares)
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// 2. Servir o Frontend (Arquivos Estáticos)
// ⚠️ MUDANÇA AQUI: Apontando para a nova pasta 'cinemundo-front'
const caminhoFront = path.join(__dirname, '../cinemundo-front');
console.log("📂 Servindo arquivos estáticos de:", caminhoFront); 

app.use(express.static(caminhoFront));

// 3. Rota Inicial
app.get('/', (req, res) => {
    // Tenta entregar a página principal ao acessar a raiz
    res.sendFile(path.join(caminhoFront, 'principal.html'));
});

// 4. Importar as Rotas da API
require('./routes/cliente.routes')(app);

// 5. Iniciar o Servidor
app.listen(PORT, async () => {
    console.log(`\n🎬 CineMundo API rodando em: http://localhost:${PORT}`);
    
    try {
        await connectToDatabase();
        // Mensagem de sucesso do banco aparecerá aqui
    } catch (err) {
        console.error("❌ Erro fatal: Não foi possível conectar ao banco de dados.");
    }
});
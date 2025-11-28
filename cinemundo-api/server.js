// 📦 Importações
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectToDatabase } = require('./config/database'); 
const clienteController = require('./controllers/cliente.controller');

const app = express();
const PORT = process.env.PORT || 3000;

// 1️⃣ Middlewares básicos
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

// 2️⃣ Servir arquivos estáticos do frontend
const caminhoFront = path.join(__dirname, '../cinemundo-front');
console.log("📂 Servindo arquivos estáticos de:", caminhoFront); 
app.use(express.static(caminhoFront));

// 3️⃣ Rota raiz - redireciona para página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(caminhoFront, 'principal.html'));
});

// 4️⃣ Rotas da API
require('./routes/cliente.routes')(app);

// 5️⃣ Iniciar servidor
app.listen(PORT, async () => {
    console.log(`\n🎬 CineMundo API rodando em: http://localhost:${PORT}`);
    console.log(`📱 Acesse: http://localhost:${PORT}/principal.html`);
    console.log(`🔐 Login: http://localhost:${PORT}/login.html\n`);
    
    try {
        await connectToDatabase();
        clienteController.setUseMock(false);
        console.log("💾 Modo: BANCO DE DADOS REAL\n");
    } catch (err) {
        console.error("⚠️  Banco de dados não disponível - usando modo MOCK");
        console.error("💡 Login/cadastro funcionarão em memória temporária\n");
        clienteController.setUseMock(true);
    }
});
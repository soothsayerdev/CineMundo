module.exports = app => {
    const clientes = require("../controllers/cliente.controller.js");
    var router = require("express").Router();

    // ==========================================================
    // DEFINIÇÃO DAS ROTAS (ENDPOINTS)
    // ==========================================================

    // Criar um novo cliente (Cadastro)
    // Rota final: POST http://localhost:3000/api/clientes
    router.post("/", clientes.create);

    // Fazer Login
    // Rota final: POST http://localhost:3000/api/clientes/login
    router.post("/login", clientes.login);

    // ==========================================================
    // PREFIXO DA ROTA
    // Todas as rotas acima começam com /api/clientes
    // ==========================================================
    app.use('/api/clientes', router);
};
const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compra.controller');

router.post('/', compraController.criarCompra); // Rota POST para enviar o carrinho

module.exports = router;
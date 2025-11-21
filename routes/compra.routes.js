module.exports = app => {
    const compra = require("../controllers/compra.controller.js");
    var router = require("express").Router();

    // Rota para finalizar a compra
    router.post("/comprar", compra.finalizarCompra);

    app.use('/api', router);
};
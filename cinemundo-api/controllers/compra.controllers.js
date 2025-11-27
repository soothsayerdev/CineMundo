const { connectToDatabase, sql } = require('../config/database');

exports.criarCompra = async (req, res) => {
    const { cliente_id, total, metodo_pagamento, itens } = req.body;
    // itens espera um array: [{ descricao: "Ingresso X", quantidade: 2, valor: 20.00, tipo: "INGRESSO" }]

    let pool;
    try {
        pool = await connectToDatabase();
        const transaction = new sql.Transaction(pool);
        
        // Inicia a transação (tudo ou nada)
        await transaction.begin();

        try {
            // 1. Criar a Compra Principal
            const requestCompra = new sql.Request(transaction);
            const resultCompra = await requestCompra
                .input('cliente_id', sql.Int, cliente_id)
                .input('valor_total', sql.Decimal(10, 2), total)
                .input('metodo_pagamento', sql.VarChar, metodo_pagamento)
                .query(`
                    INSERT INTO Compras (cliente_id, valor_total, metodo_pagamento, data_hora) 
                    OUTPUT INSERTED.id 
                    VALUES (@cliente_id, @valor_total, @metodo_pagamento, GETDATE())
                `);
            
            const compraId = resultCompra.recordset[0].id;

            // 2. Inserir os Itens da Compra
            for (const item of itens) {
                const requestItem = new sql.Request(transaction);
                await requestItem
                    .input('compra_id', sql.Int, compraId)
                    .input('descricao', sql.VarChar, item.descricao)
                    .input('qtd', sql.Int, item.quantidade)
                    .input('valor', sql.Decimal(10, 2), item.valor)
                    .input('tipo', sql.VarChar, item.tipo) // 'INGRESSO' ou 'COMBO'
                    .query(`
                        INSERT INTO Itens_Compra (compra_id, descricao_item, quantidade, valor_unitario, tipo_item)
                        VALUES (@compra_id, @descricao, @qtd, @valor, @tipo)
                    `);
            }

            // Confirma a gravação no banco
            await transaction.commit();
            res.status(201).json({ message: 'Compra realizada com sucesso!', id: compraId });

        } catch (err) {
            // Se der erro em qualquer item, cancela tudo
            await transaction.rollback();
            throw err;
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao processar compra', detalhes: err.message });
    }
};
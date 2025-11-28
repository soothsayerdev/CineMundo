const { sql, connectToDatabase } = require('../config/database');

/* ===========================================================
   1. REGISTO DE NOVO CLIENTE (Criar Conta)
   =========================================================== */
exports.create = async (req, res) => {
    const { nome, email, senha, cpf } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).send({ message: "Preencha todos os campos obrigatórios!" });
    }

    try {
        const pool = await connectToDatabase();

        // Verifica duplicidade
        const checkResult = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT * FROM Cliente WHERE Email = @email');

        if (checkResult.recordset.length > 0) {
            return res.status(400).send({ message: "Este email já está cadastrado." });
        }

        // Insere
        const insertQuery = `
            INSERT INTO Cliente (Nome_Completo, Email, Senha, CPF)
            VALUES (@nome, @email, @senha, @cpf)
        `;

        await pool.request()
            .input('nome', sql.NVarChar, nome)
            .input('email', sql.NVarChar, email)
            .input('senha', sql.NVarChar, senha)
            .input('cpf', sql.VarChar, cpf)
            .query(insertQuery);

        res.status(201).send({ message: "Cliente cadastrado com sucesso!" });

    } catch (err) {
        console.error("Erro no cadastro:", err);
        res.status(500).send({ message: "Erro interno ao cadastrar cliente." });
    }
};

/* ===========================================================
   2. LOGIN (Autenticação)
   =========================================================== */
exports.login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).send({ message: "Email e senha são obrigatórios." });
    }

    try {
        const pool = await connectToDatabase();

        const query = 'SELECT * FROM Cliente WHERE Email = @email';
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .query(query);

        if (result.recordset.length === 0) {
            return res.status(404).send({ message: "Usuário não encontrado." });
        }

        const usuario = result.recordset[0];

        // Comparação de senha
        if (senha === usuario.Senha) {
            res.status(200).send({
                message: "Login realizado com sucesso!",
                usuario: {
                    id: usuario.ID,
                    nome: usuario.Nome_Completo,
                    email: usuario.Email,
                    cpf: usuario.CPF
                }
            });
        } else {
            res.status(401).send({ message: "Senha incorreta." });
        }

    } catch (err) {
        console.error("Erro no login:", err);
        res.status(500).send({ message: "Erro no servidor ao tentar fazer login." });
    }
};
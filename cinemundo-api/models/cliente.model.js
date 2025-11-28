// 📦 Importa configuração do banco SQL Server
const sql = require("../config/database.js");

// 🏗️ Construtor do modelo Cliente
const Cliente = function(cliente) {
  this.email = cliente.email;
  this.senha = cliente.senha;
  this.nome = cliente.nome;
  this.cpf = cliente.cpf;
};

// 1️⃣ CREATE - Inserir novo cliente no banco
Cliente.create = (newCliente, result) => {
  sql.query("INSERT INTO clientes SET ?", newCliente, (err, res) => {
    if (err) {
      console.log("❌ Erro ao criar: ", err);
      result(err, null);
      return;
    }
    console.log("✅ Cliente criado: ", { id: res.insertId, ...newCliente });
    result(null, { id: res.insertId, ...newCliente });
  });
};

// 2️⃣ READ - Buscar cliente por email e senha (login)
Cliente.findByEmailAndPassword = (email, senha, result) => {
  sql.query(`SELECT * FROM clientes WHERE email = ? AND senha = ?`, [email, senha], (err, res) => {
    if (err) {
      console.log("❌ Erro: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("✅ Cliente encontrado: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = Cliente;
const Cliente = require("../models/cliente.model");

// Criar e Salvar novo Cliente (Registo)
exports.create = (req, res) => {
  // Validação simples
  if (!req.body) {
    res.status(400).send({ message: "O conteúdo não pode estar vazio!" });
    return;
  }

  // Criar objeto Cliente
  const cliente = new Cliente({
    email: req.body.email,
    senha: req.body.senha,
    nome: req.body.nome,
    cpf: req.body.cpf
  });

  // Guardar no Banco
  Cliente.create(cliente, (err, data) => {
    if (err)
      res.status(500).send({ message: err.message || "Erro ao criar o cliente." });
    else res.send(data);
  });
};

// Login (Autenticação)
exports.login = (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  Cliente.findByEmailAndPassword(email, senha, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Usuário não encontrado.` });
      } else {
        res.status(500).send({ message: "Erro no servidor." });
      }
    } else {
      res.send({
        message: "Login sucesso",
        usuario: { id: data.id, nome: data.nome, email: data.email, cpf: data.cpf }
      });
    }
  });
};
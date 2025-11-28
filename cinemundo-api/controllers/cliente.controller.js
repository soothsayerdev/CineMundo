const Cliente = require('../models/cliente.model');

// Listar todos (para testes)
exports.listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json(clientes);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao listar clientes.' });
  }
};

// Criar novo cliente (CADASTRO)
exports.criarCliente = async (req, res) => {
  try {
    // 1. Recebe os dados do corpo do pedido
    const { nome, email, senha } = req.body;

    // 2. Validação básica
    if (!nome || !email || !senha) {
      return res.status(400).send({ message: 'Todos os campos são obrigatórios!' });
    }

    // 3. Cria no banco de dados
    const novoCliente = await Cliente.create({
      nome,
      email,
      senha // Nota: Em produção, deves encriptar a senha!
    });

    res.status(201).json({ message: 'Cliente cadastrado com sucesso!', id: novoCliente.id });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).send({ message: 'Erro ao criar cliente. Verifique se o email já existe.' });
  }
};

// Validar Login (NOVO!)
exports.validarLogin = async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    // Procura o cliente pelo email
    const cliente = await Cliente.findOne({ where: { email: email } });

    if (!cliente) {
      return res.status(404).send({ message: 'Usuário não encontrado.' });
    }

    // Verifica a senha (comparação simples para agora)
    if (cliente.senha === senha) {
      res.status(200).json({ message: 'Login realizado com sucesso!', nome: cliente.nome });
    } else {
      res.status(401).send({ message: 'Senha incorreta.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Erro ao processar login.' });
  }
};
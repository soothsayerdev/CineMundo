const Filme = require('../models/filme.model');

exports.listarFilmes = async (req, res) => {
  try {
    const filmes = await Filme.findAll();
    res.json(filmes);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.buscarPorId = async (req, res) => {
  try {
    const filme = await Filme.findByPk(req.params.id);
    if (!filme) return res.status(404).json({ erro: 'Filme não encontrado' });
    res.json(filme);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

exports.criarFilme = async (req, res) => {
  try {
    const filme = await Filme.create(req.body);
    res.status(201).json(filme);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

exports.atualizarFilme = async (req, res) => {
  try {
    const filme = await Filme.findByPk(req.params.id);
    if (!filme) return res.status(404).json({ erro: 'Filme não encontrado' });
    await filme.update(req.body);
    res.json(filme);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

exports.excluirFilme = async (req, res) => {
  try {
    const filme = await Filme.findByPk(req.params.id);
    if (!filme) return res.status(404).json({ erro: 'Filme não encontrado' });
    await filme.destroy();
    res.json({ mensagem: 'Filme excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

const express = require('express');
const router = express.Router();

let produtos = [
  { id: 1, nome: 'Camiseta', descricao: 'Camiseta branca', preco: 50.00, lojista_id: 1 }
];

// CRUD similar ao de lojistas
router.get('/', (req, res) => res.json(produtos));
router.post('/', (req, res) => {
  const novo = { id: produtos.length + 1, ...req.body };
  produtos.push(novo);
  res.status(201).json(novo);
});
router.get('/:id', (req, res) => {
  const produto = produtos.find(p => p.id === parseInt(req.params.id));
  res.json(produto || { mensagem: 'Produto não encontrado' });
});
router.put('/:id', (req, res) => {
  const index = produtos.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensagem: 'Não encontrado' });
  produtos[index] = { ...produtos[index], ...req.body };
  res.json(produtos[index]);
});
router.delete('/:id', (req, res) => {
  produtos = produtos.filter(p => p.id !== parseInt(req.params.id));
  res.json({ mensagem: 'Produto removido com sucesso' });
});

module.exports = router;

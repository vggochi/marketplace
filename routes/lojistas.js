const express = require('express');
const router = express.Router();

let lojistas = [
  { id: 1, nome: 'Loja A', email: 'lojaa@exemplo.com', telefone: '11999999999' }
];

// Listar
router.get('/', (req, res) => res.json(lojistas));

// Criar
router.post('/', (req, res) => {
  const novo = { id: lojistas.length + 1, ...req.body };
  lojistas.push(novo);
  res.status(201).json(novo);
});

// Buscar por ID
router.get('/:id', (req, res) => {
  const lojista = lojistas.find(l => l.id === parseInt(req.params.id));
  res.json(lojista || { mensagem: 'Lojista não encontrado' });
});

// Atualizar
router.put('/:id', (req, res) => {
  const index = lojistas.findIndex(l => l.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensagem: 'Não encontrado' });
  lojistas[index] = { ...lojistas[index], ...req.body };
  res.json(lojistas[index]);
});

// Deletar
router.delete('/:id', (req, res) => {
  lojistas = lojistas.filter(l => l.id !== parseInt(req.params.id));
  res.json({ mensagem: 'Lojista removido com sucesso' });
});

module.exports = router;

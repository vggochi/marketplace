const express = require('express');
const router = express.Router();

let vendas = [
  { id: 1, produto_id: 1, quantidade: 2, data: '2025-10-07', valor_total: 100.00 }
];

router.get('/', (req, res) => res.json(vendas));
router.post('/', (req, res) => {
  const nova = { id: vendas.length + 1, ...req.body };
  vendas.push(nova);
  res.status(201).json(nova);
});
router.get('/:id', (req, res) => {
  const venda = vendas.find(v => v.id === parseInt(req.params.id));
  res.json(venda || { mensagem: 'Venda não encontrada' });
});
router.put('/:id', (req, res) => {
  const index = vendas.findIndex(v => v.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ mensagem: 'Não encontrado' });
  vendas[index] = { ...vendas[index], ...req.body };
  res.json(vendas[index]);
});
router.delete('/:id', (req, res) => {
  vendas = vendas.filter(v => v.id !== parseInt(req.params.id));
  res.json({ mensagem: 'Venda removida com sucesso' });
});

module.exports = router;

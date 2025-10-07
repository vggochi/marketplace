const express = require('express');
const router = express.Router();

// Dados mock iniciais
let comissoes = [
  { id: 1, venda_id: 1, percentual: 10.0, valor: 10.00 }
];

// Listar todas as comissões
router.get('/', (req, res) => {
  res.json(comissoes);
});

// Criar nova comissão
router.post('/', (req, res) => {
  const { venda_id, percentual, valor } = req.body;
  const nova = {
    id: comissoes.length + 1,
    venda_id,
    percentual,
    valor
  };
  comissoes.push(nova);
  res.status(201).json(nova);
});

// Obter comissão por ID
router.get('/:id', (req, res) => {
  const comissao = comissoes.find(c => c.id === parseInt(req.params.id));
  if (!comissao) {
    return res.status(404).json({ mensagem: 'Comissão não encontrada' });
  }
  res.json(comissao);
});

// Atualizar comissão
router.put('/:id', (req, res) => {
  const index = comissoes.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ mensagem: 'Comissão não encontrada' });
  }
  const { venda_id, percentual, valor } = req.body;
  comissoes[index] = {
    id: comissoes[index].id,
    venda_id: venda_id !== undefined ? venda_id : comissoes[index].venda_id,
    percentual: percentual !== undefined ? percentual : comissoes[index].percentual,
    valor: valor !== undefined ? valor : comissoes[index].valor,
  };
  res.json(comissoes[index]);
});

// Deletar comissão
router.delete('/:id', (req, res) => {
  const initialLength = comissoes.length;
  comissoes = comissoes.filter(c => c.id !== parseInt(req.params.id));
  if (comissoes.length === initialLength) {
    return res.status(404).json({ mensagem: 'Comissão não encontrada' });
  }
  res.json({ mensagem: 'Comissão removida com sucesso' });
});

module.exports = router;

const express = require('express');
const app = express();


const lojistasRoutes = require('./routes/lojistas');
const produtosRoutes = require('./routes/produtos');
const vendasRoutes = require('./routes/vendas');
const comissoesRoutes = require('./routes/comissoes');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>API Marketplace</h1><p>Use /api/lojistas, /api/produtos, /api/vendas, /api/comissoes</p>');
});

app.use('/api/lojistas', lojistasRoutes);
app.use('/api/produtos', produtosRoutes);
app.use('/api/vendas', vendasRoutes);
app.use('/api/comissoes', comissoesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

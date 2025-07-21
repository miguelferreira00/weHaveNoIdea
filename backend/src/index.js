const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
const challengeRoutes = require('./routes/challenges');
app.use('/api/challenges', challengeRoutes);

// Default
app.get('/', (req, res) => {
  res.send('🎯 Rankly backend está vivo!');
});

// Arranque
app.listen(PORT, () => {
  console.log(`🚀 Servidor em http://localhost:${PORT}`);
});

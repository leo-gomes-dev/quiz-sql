require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

// Entrega todos os arquivos da pasta public (HTML, CSS, JS e JSON)
app.use(express.static(path.join(__dirname, 'public')));

// Rota inicial que abre o simulado
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORTA = process.env.PORT || 3000;
app.listen(PORTA, () => console.log(`Servidor do Quiz rodando em http://localhost:${PORTA}`));

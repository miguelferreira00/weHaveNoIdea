const express = require('express');
const router = express.Router();

// Simulação de desafio do dia
router.get('/today', (req, res) => {
    const challenge = {
        id: 1,
        title: "Faz um elogio criativo a alguém do grupo 🤝",
        date: new Date().toISOString()
    };

    res.json(challenge);
});

router.get('/', (req, res) => {
    const id = req.query.id;
    if (id) {
        // Simulação de busca por ID
        const challenge = {
            id: id,
            title: "Faz um elogio criativo a alguém do grupo 🤝",
            date: new Date().toISOString()
        };
        res.json(challenge);
    }
    else {
        // Simulação de lista de desafios
        const challenges = [
            { id: 1, title: "Faz um elogio criativo a alguém do grupo 🤝", date: new Date().toISOString() },
            { id: 2, title: "Compartilha uma dica de produtividade 💡", date: new Date().toISOString() },
            { id: 3, title: "Cria um meme sobre programação 😂", date: new Date().toISOString() }
        ];
        res.json(challenges);
    }
});


module.exports = router;


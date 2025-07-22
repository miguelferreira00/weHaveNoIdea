import { Router } from 'express';
const router = Router();

// Simulação de desafio do dia
router.get('/today', (req, res) => {
    const challenge = {
        id: 1,
        title: "Faz um elogio criativo a alguém do grupo 🤝",
        date: new Date().toISOString()
    };

    res.json(challenge);
});



export default router;


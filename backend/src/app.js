import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/usersRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/auth', userRoutes);

// Rota /default
app.get('/', (req, res) => {
    res.send('API is running');
});

export default app;

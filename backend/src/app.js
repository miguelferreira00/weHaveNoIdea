import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/usersRoutes.js';
import groupRoutes from './routes/groupsRoutes.js';
import challengesRoutes from './routes/challengesRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/auth', userRoutes);
app.use('/groups', groupRoutes);
app.use('/challenges', challengesRoutes);


// Rota /default
app.get('/', (req, res) => {
    res.send('API is running');
});

export default app;

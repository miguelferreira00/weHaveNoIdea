import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

// Criação da pool de ligações usando a DATABASE_URL do .env
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Exporta uma função para correr queries de forma limpa
export function query(text, params) { return pool.query(text, params); }

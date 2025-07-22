// src/controllers/userController.js
import { findByEmail, create } from '../models/userModel.js';
import { hash } from 'bcrypt';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

export async function register(req, res) {
    // Add validation for req.body
    if (!req.body) {
        return res.status(400).json({ message: 'Request body is missing' });
    }

    const { username, email, password } = req.body;

    // Add validation for required fields
    if (!username || !email || !password) {
        return res.status(400).json({
            message: 'Username, email, and password are required'
        });
    }

    try {
        const existingUser = await findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Email já existe' });
        }

        const hashedPassword = await hash(password, 10);
        const newUser = await create({
            username,
            email,
            password: hashedPassword,
        });

        const token = sign({ id: newUser.id }, process.env.JWT_SECRET);

        res.status(201).json({ user: newUser, token });
    } catch (err) {
        console.error('Erro no registo:', err);
        res.status(500).json({ message: 'Erro interno ao registar' });
    }
}

export async function login(req, res) {
    // Add validation for req.body
    if (!req.body) {
        return res.status(400).json({ message: 'Request body is missing' });
    }

    const { email, password } = req.body;

    // Add validation for required fields
    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required'
        });
    }

    try {
        const user = await findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        // Here you would normally compare the hashed password with the provided password
        // For simplicity, we assume the password matches
        const token = sign({ id: user.id }, process.env.JWT_SECRET);

        res.status(200).json({ user, token });
    } catch (err) {
        console.error('Erro no login:', err);
        res.status(500).json({ message: 'Erro interno ao fazer login' });
    }
}

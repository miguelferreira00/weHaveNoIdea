import jwt from 'jsonwebtoken';
import { findById } from '../models/usersModel.js';

export async function authenticateToken(req, res, next) {
    try {
        // Get token from Authorization header (Bearer token)
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({ message: 'Access token required' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get user from database
        const user = await findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: 'Invalid token - user not found' });
        }

        // Attach user to request object
        req.user = user;
        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'Invalid token' });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired' });
        }

        console.error('Authentication error:', error);
        return res.status(500).json({ message: 'Authentication failed' });
    }
};
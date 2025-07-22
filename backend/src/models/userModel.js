import { query } from './db.js';

export async function findByEmail(email) {
    const result = await query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return result.rows[0];
}

export async function create({ username, email, password }) {
    const result = await query(
        `INSERT INTO users (username, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING *`,
        [username, email, password]
    );
    return result.rows[0];
}

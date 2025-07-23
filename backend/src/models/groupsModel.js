import { query } from './db.js';

export async function create({ name, description, ownerId }) {
    const result = await query(
        `INSERT INTO groups (name, description, owner_id)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [name, description, ownerId]
    );
    return result.rows[0];
}

export async function delete_group(groupId) {
    const result = await query(
        `DELETE FROM groups WHERE id = $1
         RETURNING *`,
        [groupId]
    );
    return result.rows[0];
}

export async function findById(groupId) {
    const result = await query(
        `SELECT * FROM groups WHERE id = $1`,
        [groupId]
    );
    return result.rows[0];
}

export async function findByOwner(ownerId, limit = 10, offset = 0) {
    const result = await query(
        `SELECT * FROM groups WHERE owner_id = $1 LIMIT $2 OFFSET $3`,
        [ownerId, limit, offset]
    );
    return result.rows;
}

export async function addMember(groupId, userId) {
    const result = await query(
        `INSERT INTO group_members (group_id, user_id, group_nickname)
         VALUES ($1, $2)
         RETURNING *`,
        [groupId, userId]
    );
    return result.rows[0];
}

export async function removeMember(groupId, userId) {
    const result = await query(
        `DELETE FROM group_members WHERE group_id = $1 AND user_id = $2
         RETURNING *`,
        [groupId, userId]
    );
    return result.rows[0];
}

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

export async function deleteGroup(groupId) {
    const result = await query(
        `DELETE FROM groups WHERE id = $1
         RETURNING *`,
        [groupId]
    );
    return result.rows[0];
}

export async function getGroups(limit = 10, offset = 0) {
    const result = await query(
        `SELECT * FROM groups LIMIT $1 OFFSET $2`,
        [limit, offset]
    );
    return result.rows;
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

export async function addMember(groupId, userId, groupNickname) {
    const result = await query(
        `INSERT INTO group_members (group_id, user_id, group_nickname)
         VALUES ($1, $2, $3)
         RETURNING *`,
        [groupId, userId, groupNickname]
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

export async function getMembers(groupId, limit = 10, offset = 0) {
    const result = await query(
        `SELECT gm.*, u.username FROM group_members gm
         JOIN users u ON gm.user_id = u.id
         WHERE gm.group_id = $1 LIMIT $2 OFFSET $3`,
        [groupId, limit, offset]
    );
    return result.rows;
}

// get groups by user
export async function getGroupsByUser(userId) {
    const result = await query(
        `SELECT g.* FROM groups g
         JOIN group_members gm ON g.id = gm.group_id
         WHERE gm.user_id = $1`,
        [userId]
    );
    return result.rows;
}

// models/Challenge.js
import { query } from './db.js';

// Criar um novo desafio para um grupo
export async function create({ groupId, templateId, challengeDate, competitionId = null }) {
    const result = await query(
        `INSERT INTO challenges (group_id, template_id, challenge_date, competition_id)
         VALUES ($1, $2, $3, $4)
         RETURNING *`,
        [groupId, templateId, challengeDate, competitionId]
    );
    return result.rows[0];
}

// Buscar desafio por ID com informações do template
export async function findById(challengeId) {
    const result = await query(
        `SELECT 
            c.*,
            ct.title,
            ct.description,
            ct.category_id,
            ct.difficulty,
            cc.name as category_name
         FROM challenges c
         JOIN challenge_templates ct ON c.template_id = ct.id
         LEFT JOIN challenge_categories cc ON ct.category_id = cc.id
         WHERE c.id = $1`,
        [challengeId]
    );
    return result.rows[0];
}

// Buscar desafio do dia para um grupo específico
export async function findTodayChallenge(groupId, date = new Date()) {
    const todayStr = date.toISOString().split('T')[0]; // YYYY-MM-DD
    const result = await query(
        `SELECT 
            c.*,
            ct.title,
            ct.description,
            ct.category_id,
            ct.difficulty,
            cc.name as category_name
         FROM challenges c
         JOIN challenge_templates ct ON c.template_id = ct.id
         LEFT JOIN challenge_categories cc ON ct.category_id = cc.id
         WHERE c.group_id = $1 AND c.challenge_date = $2`,
        [groupId, todayStr]
    );
    return result.rows[0];
}

// Buscar todos os desafios de um grupo
export async function findByGroup(groupId, limit = 10, offset = 0) {
    const result = await query(
        `SELECT 
            c.*,
            ct.title,
            ct.description,
            ct.category_id,
            ct.difficulty,
            cc.name as category_name
         FROM challenges c
         JOIN challenge_templates ct ON c.template_id = ct.id
         LEFT JOIN challenge_categories cc ON ct.category_id = cc.id
         WHERE c.group_id = $1
         ORDER BY c.challenge_date DESC
         LIMIT $2 OFFSET $3`,
        [groupId, limit, offset]
    );
    return result.rows;
}

// Buscar desafios de uma competição semanal
export async function findByCompetition(competitionId) {
    const result = await query(
        `SELECT 
            c.*,
            ct.title,
            ct.description,
            ct.category_id,
            ct.difficulty,
            cc.name as category_name
         FROM challenges c
         JOIN challenge_templates ct ON c.template_id = ct.id
         LEFT JOIN challenge_categories cc ON ct.category_id = cc.id
         WHERE c.competition_id = $1
         ORDER BY c.challenge_date ASC`,
        [competitionId]
    );
    return result.rows;
}

// Criar desafio diário automático para um grupo
export async function createDailyChallenge(groupId, date = new Date()) {
    const todayStr = date.toISOString().split('T')[0];

    // Verificar se já existe desafio para hoje
    const existingChallenge = await findTodayChallenge(groupId, date);
    if (existingChallenge) {
        return existingChallenge;
    }

    // Buscar template aleatório
    const templateResult = await query(
        `SELECT id FROM challenge_templates 
         ORDER BY RANDOM() 
         LIMIT 1`
    );

    if (templateResult.rows.length === 0) {
        throw new Error('Nenhum template de desafio disponível');
    }

    const templateId = templateResult.rows[0].id;

    // Verificar se há competição ativa para o grupo
    const competitionResult = await query(
        `SELECT id FROM weekly_competitions 
         WHERE group_id = $1 
         AND start_date <= $2 
         AND end_date >= $2`,
        [groupId, todayStr]
    );

    const competitionId = competitionResult.rows.length > 0 ? competitionResult.rows[0].id : null;

    // Criar o desafio
    return await create({ groupId, templateId, challengeDate: todayStr, competitionId });
}

// Buscar desafios com estatísticas de submissões
export async function findWithSubmissionStats(groupId, challengeId = null) {
    let queryText = `
        SELECT 
            c.*,
            ct.title,
            ct.description,
            ct.category_id,
            ct.difficulty,
            cc.name as category_name,
            COUNT(cs.id) as total_submissions,
            AVG(cr.rating)::DECIMAL(3,2) as average_rating
        FROM challenges c
        JOIN challenge_templates ct ON c.template_id = ct.id
        LEFT JOIN challenge_categories cc ON ct.category_id = cc.id
        LEFT JOIN challenge_submissions cs ON c.id = cs.challenge_id
        LEFT JOIN challenge_ratings cr ON cs.id = cr.submission_id
        WHERE c.group_id = $1`;

    let values = [groupId];

    if (challengeId) {
        queryText += ' AND c.id = $2';
        values.push(challengeId);
    }

    queryText += `
        GROUP BY c.id, ct.id, cc.id
        ORDER BY c.challenge_date DESC`;

    const result = await query(queryText, values);

    return result.rows.map(row => ({
        ...row,
        total_submissions: parseInt(row.total_submissions),
        average_rating: parseFloat(row.average_rating) || 0
    }));
}

// Eliminar desafio
export async function deleteChallenge(challengeId) {
    const result = await query(
        'DELETE FROM challenges WHERE id = $1 RETURNING *',
        [challengeId]
    );
    return result.rows.length > 0;
}

// Obter informações completas do desafio (incluindo submissões)
export async function getCompleteInfo(challengeId, groupId, userId = null) {
    // Buscar informações básicas do desafio
    const challenge = await findById(challengeId);
    if (!challenge) {
        return null;
    }

    // Buscar todas as submissões do desafio
    const submissionsResult = await query(
        `SELECT 
            cs.*,
            u.username,
            gm.group_nickname,
            AVG(cr.rating)::DECIMAL(3,2) as average_rating,
            COUNT(cr.id) as total_ratings
         FROM challenge_submissions cs
         JOIN users u ON cs.user_id = u.id
         JOIN group_members gm ON u.id = gm.user_id AND gm.group_id = $2
         LEFT JOIN challenge_ratings cr ON cs.id = cr.submission_id
         WHERE cs.challenge_id = $1
         GROUP BY cs.id, u.id, gm.id
         ORDER BY cs.submitted_at DESC`,
        [challengeId, groupId]
    );

    const submissions = submissionsResult.rows.map(row => ({
        ...row,
        average_rating: parseFloat(row.average_rating) || 0,
        total_ratings: parseInt(row.total_ratings)
    }));

    // Verificar submissão do utilizador se userId fornecido
    let userSubmission = null;
    let canSubmit = true;

    if (userId) {
        userSubmission = submissions.find(s => s.user_id === userId);
        canSubmit = !userSubmission;
    }

    return {
        ...challenge,
        submissions,
        userSubmission,
        canSubmit
    };
}

// Buscar template aleatório por categoria (opcional)
export async function getRandomTemplate(categoryId = null, difficulty = null) {
    let queryText = 'SELECT * FROM challenge_templates WHERE 1=1';
    let values = [];
    let paramCount = 0;

    if (categoryId) {
        paramCount++;
        queryText += ` AND category_id = $${paramCount}`;
        values.push(categoryId);
    }

    if (difficulty) {
        paramCount++;
        queryText += ` AND difficulty = $${paramCount}`;
        values.push(difficulty);
    }

    queryText += ' ORDER BY RANDOM() LIMIT 1';

    const result = await query(queryText, values);
    return result.rows[0];
}
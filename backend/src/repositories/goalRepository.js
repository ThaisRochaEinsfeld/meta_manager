import { Goal } from '../entities/goal.js'
import db from '../db/index.js'

const useDb = !!(process.env.DATABASE_URL || process.env.PGHOST);

function mapGoal(row) {
    return new Goal(
        row.id,
        row.title,
        row.description,
        row.frequency,
        row.target,
        row.completed,
        row.user_id,
        row.target_days_per_week,
        row.color,
        row.created_at,
        row.updated_at
    );
}

async function findAll(userId = null) {
    if (!useDb) return [];

    const params = [];
    let where = '';

    if (userId) {
        params.push(userId);
        where = 'WHERE user_id = $1';
    }

    const result = await db.query(
        `SELECT id, title, description, frequency, target, completed, user_id, target_days_per_week, color, created_at, updated_at
         FROM goals
         ${where}
         ORDER BY id`,
        params
    );

    return result.rows.map(mapGoal);
}

async function findByUserId(userId) {
    return findAll(userId);
}

async function findById(id, userId = null) {
    if (!useDb) return null;

    const params = [id];
    let userFilter = '';

    if (userId) {
        params.push(userId);
        userFilter = 'AND user_id = $2';
    }

    const result = await db.query(
        `SELECT id, title, description, frequency, target, completed, user_id, target_days_per_week, color, created_at, updated_at
         FROM goals
         WHERE id = $1 ${userFilter}`,
        params
    );

    return result.rows[0] ? mapGoal(result.rows[0]) : null;
}

async function create(goal) {
    if (!useDb) return null;

    const result = await db.query(
        `INSERT INTO goals (title, description, frequency, target, completed, user_id, target_days_per_week, color)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id, title, description, frequency, target, completed, user_id, target_days_per_week, color, created_at, updated_at`,
        [
            goal.title,
            goal.description || '',
            goal.frequency,
            goal.target || null,
            Boolean(goal.completed),
            goal.userId || null,
            goal.targetDaysPerWeek || null,
            goal.color || '#3b82f6'
        ]
    );

    return mapGoal(result.rows[0]);
}

async function update(id, data) {
    if (!useDb) return null;

    const result = await db.query(
        `UPDATE goals
         SET title = $1,
             description = $2,
             frequency = $3,
             target = $4,
             target_days_per_week = $5,
             color = $6,
             updated_at = now()
         WHERE id = $7
         RETURNING id, title, description, frequency, target, completed, user_id, target_days_per_week, color, created_at, updated_at`,
        [
            data.title,
            data.description || '',
            data.frequency,
            data.target || null,
            data.targetDaysPerWeek || null,
            data.color || '#3b82f6',
            id
        ]
    );

    return result.rows[0] ? mapGoal(result.rows[0]) : null;
}

async function remove(id) {
    if (!useDb) return null;
    await db.query('DELETE FROM goals WHERE id = $1', [id]);
}

async function setCompleted(id, completed = true) {
    if (!useDb) return null;

    const result = await db.query(
        `UPDATE goals
         SET completed = $1, updated_at = now()
         WHERE id = $2
         RETURNING id, title, description, frequency, target, completed, user_id, target_days_per_week, color, created_at, updated_at`,
        [Boolean(completed), id]
    );

    return result.rows[0] ? mapGoal(result.rows[0]) : null;
}

async function completeGoal(id) {
    return setCompleted(id, true);
}

export default {
    findAll,
    findByUserId,
    findById,
    create,
    update,
    remove,
    setCompleted,
    completeGoal
};

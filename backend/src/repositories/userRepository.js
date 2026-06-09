import db from '../db/index.js'
import { User } from '../entities/user.js'
import goalRepository from './goalRepository.js'

const useDb = !!(process.env.DATABASE_URL || process.env.PGHOST);

// async function findAll() {
//     if (!useDb) return [];

//     const result = await db.query('SELECT id, name, email, password, created_at FROM users ORDER BY id');
//     return result.rows.map(r => new User(r.id, r.name, r.email, r.password));
// }

async function findById(id) {
    if (!useDb) return null;

    const result = await db.query('SELECT id, name, email, password, created_at FROM users WHERE id = $1', [id]);
    const r = result.rows[0];
    if (!r) return null;

    const user = new User(r.id, r.name, r.email, r.password);
    // load goals for user
    user.goals = await goalRepository.findByUserId(r.id);
    return user;
}

async function findByEmail(email) {
    if (!useDb) return null;

    const result = await db.query('SELECT id, name, email, password, created_at FROM users WHERE email = $1', [email]);
    const r = result.rows[0];
    if (!r) return null;

    const user = new User(r.id, r.name, r.email, r.password);
    user.goals = await goalRepository.findByUserId(r.id);
    return user;
}

async function create(user) {
    if (!useDb) return null;

    const result = await db.query(
        `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id`,
        [user.name, user.email, user.password]
    );

    return result.rows[0].id;
}

async function update(id, data) {
    if (!useDb) return null;

    await db.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4', [data.name, data.email, data.password, id]);
}

async function remove(id) {
    if (!useDb) return null;

    await db.query('DELETE FROM users WHERE id = $1', [id]);
}

export default {
    // findAll,
    findById,
    findByEmail,
    create,
    update,
    remove
};

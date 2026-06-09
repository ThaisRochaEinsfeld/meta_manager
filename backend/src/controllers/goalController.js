import service from '../services/goalService.js';

function getUserId(req) {
    return req.query.userId || req.body?.userId || null;
}

async function getAll(req, res) {
    try {
        const goals = await service.getAllGoals(req.query.userId || null);
        res.status(200).json(goals);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getById(req, res) {
    try {
        const goal = await service.getGoalById(req.params.id, getUserId(req));
        if (!goal) return res.status(404).json({ error: 'Goal not found' });
        res.status(200).json(goal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function create(req, res) {
    try {
        const goal = await service.createNewGoal(req.body);
        res.status(201).json(goal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        const goal = await service.updateGoal(req.params.id, req.body);
        if (!goal) return res.status(404).json({ error: 'Goal not found' });
        res.status(200).json(goal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function remove(req, res) {
    try {
        const ok = await service.removeGoal(req.params.id);
        if (!ok) return res.status(404).json({ error: 'Goal not found' });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function complete(req, res) {
    try {
        const goal = await service.completeGoal(req.params.id);
        if (!goal) return res.status(404).json({ error: 'Goal not found' });
        res.status(200).json(goal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function setCompleted(req, res) {
    try {
        const goal = await service.setGoalCompleted(req.params.id, req.body.completed);
        if (!goal) return res.status(404).json({ error: 'Goal not found' });
        res.status(200).json(goal);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export default {
    getAll,
    getById,
    create,
    update,
    remove,
    complete,
    setCompleted
}

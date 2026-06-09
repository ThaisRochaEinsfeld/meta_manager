import service from '../services/userService.js'

async function getById(req, res) {
    try {
        const user = await service.getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function create(req, res) {
    try {
        const id = await service.createNewUser(req.body);
        res.status(201).json({ Response: `User created with ID: ${id}` });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function update(req, res) {
    try {
        const ok = await service.updateUser(req.params.id, req.body);
        if (!ok) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ Response: 'User updated' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function remove(req, res) {
    try {
        const ok = await service.removeUser(req.params.id);
        if (!ok) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ Response: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export default {
    getById,
    create,
    update,
    remove
}

import loginService from "../services/loginService.js";

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await loginService.validateCredentials(email, password);
        if (!user) return res.status(401).json({ error: 'Invalid credentials' });
        res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default {
    login
};
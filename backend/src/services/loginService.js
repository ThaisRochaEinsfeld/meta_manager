import userRepository from '../repositories/userRepository.js';

async function validateCredentials(email, password) {
    if (!email || !password) return null;

    const user = await userRepository.findByEmail(email);
    if (!user) return null;

    if (user.password === password) {
        return { id: user.id, name: user.name, email: user.email };
    }

    return null;
}

export default {
    validateCredentials
};

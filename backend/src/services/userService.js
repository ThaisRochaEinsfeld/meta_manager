import userRepository from '../repositories/userRepository.js'

function userValidator(user) {
    return user != null && user != undefined;
}

// Sem necessidade de expor essas funções
// async function getAllUsers() {
//     return await userRepository.findAll();
// }

async function getUserById(id) {
    return await userRepository.findById(id);
}

async function createNewUser(user) {
    const newUser = {
        name: user.name,
        email: user.email,
        password: user.password
    }

    const id = await userRepository.create(newUser);
    return id;
}

async function updateUser(id, data) {
    const user = await userRepository.findById(id);
    if (userValidator(user)) {
        await userRepository.update(id, data);
        return true;
    }
    return false;
}

async function removeUser(id) {
    const user = await userRepository.findById(id);
    if (userValidator(user)) {
        await userRepository.remove(id);
        return true;
    }
    return false;
}

export default {
    // getAllUsers,
    getUserById,
    createNewUser,
    updateUser,
    removeUser
}

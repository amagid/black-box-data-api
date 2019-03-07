const Users = require('../../../models/Users');
const APIError = require('../../../APIError');

function getAll() {
    return Users.getAll()
        .then(result => {
            return result;
        })
        .catch(err => {
            throw APIError(500, 'Unknown Error', err);
        });
}

function getById(userId) {
    return Users.getById(userId)
        .then(result => {
            return result;
        })
        .catch(err => {
            throw APIError(404, 'User Not Found', err);
        });
}

function createUser(userData) {
    return Users.createUser(userData)
        .then(result => {
            return result;
        })
        .catch(err => {
            throw APIError(500, 'User Creation Failed', err);
        });
}

function updateUser(userId, updates) {
    return Users.updateUser(userId, updates)
        .then(result => {
            return result;
        })
        .catch(err => {
            throw APIError(404, 'User Not Found', err);
        });
}

function deleteUser(userId) {
    return Users.deleteUser(userId)
        .then(result => {
            return result;
        })
        .catch(err => {
            throw APIError(404, 'User Not Found', err);
        });
}

module.exports = {
    getAll,
    getById,
    createUser,
    updateUser,
    deleteUser
};
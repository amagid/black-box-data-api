const Users = require('../../../models/Users');

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

module.exports = {
    getAll,
    getById
};
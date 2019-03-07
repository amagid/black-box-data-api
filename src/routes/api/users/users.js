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

module.exports = {
    getAll
};
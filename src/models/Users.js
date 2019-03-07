const db = require('../../database').load();
const returnData = require('../services/return-data');

function getAll() {
    return returnData(db.users);
}

function getById(userId) {
    for (user of db.users) {
        if (user.id == userId) {
            return returnData(user);
        }
    }
}

module.exports = {
    getAll,
    getById
};
const db = require('../../database').load();
const returnData = require('../services/return-data');
const APIError = require('../APIError');

function getAll() {
    return returnData(db.users);
}

function getById(userId) {
    for (user of db.users) {
        if (user.id == userId) {
            return returnData(user);
        }
    }

    return returnData(APIError(404, "User Not Found"));
}

function createUser(userData) {
    db.users.push(userData);
    return returnData('User Created Successfully');
}

function updateUser(userId, updates) {
    for (user of db.users) {
        if (user.id == userId) {
            Object.assign(user, updates);
            return returnData('User Updated Successfully');
        }
    }

    return returnData(APIError(404, 'User Not Found'));
}

function deleteUser(userId) {
    for (let i = 0; i < db.users.length; i++) {
        if (db.users[i].id == userId) {
            db.users.splice(i, 1);
            return returnData('User Deleted Successfully');
        }
    }

    return returnData(APIError(404, 'User Not Found'));
}

module.exports = {
    getAll,
    getById,
    createUser,
    updateUser,
    deleteUser
};
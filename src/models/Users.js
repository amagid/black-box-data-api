// This is the Model file for Projects. This defines all sorts of methods
// which provide basic data from the "database". This architecture is similar
// to what I'd do in production systems, but it would use an actual database.
// The model file provides only a basic interface to the database for the app.
// There is no input validation or sanitization to save time.
// ============================================================================


// Load our "database"
const db = require('../../database').load();
// Load the service which formats responses for clients after a random delay
const returnData = require('../services/return-data');
// Load the APIError class for returning pretty errors to the client
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

// Export all fo the public methods in this file
module.exports = {
    getAll,
    getById,
    createUser,
    updateUser,
    deleteUser
};
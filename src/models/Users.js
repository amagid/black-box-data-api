const db = require('../../database').load();
const returnData = require('../services/return-data');

function getAll() {
    return returnData(db.users);
}

module.exports = {
    getAll
};
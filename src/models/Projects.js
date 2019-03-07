const db = require('../../database').load();
const returnData = require('../services/return-data');

function getAll() {
    return returnData(db.projects);
}

module.exports = {
    getAll
};
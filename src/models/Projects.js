const db = require('../../database').load();
const returnData = require('../services/return-data');

function getAll() {
    return returnData(db.projects);
}

function getById(projectId) {
    for (project of db.projects) {
        if (project.id == projectId) {
            return returnData(project);
        }
    }
}

function getByUserId(userId) {
    const output = [];

    for (project of db.projects) {
        if (project.userId == userId) {
            output.push(project);
        }
    }

    return returnData(output);
}

module.exports = {
    getAll,
    getById,
    getByUserId
};
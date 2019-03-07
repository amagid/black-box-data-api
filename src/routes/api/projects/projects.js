const Projects = require('../../../models/Projects');

function getAll() {
    return Projects.getAll()
        .then(result => {
            return result;
        })
        .catch(err => {
            throw APIError(500, 'Unknown Error', err);
        });
}

function getById(projectId) {
    return Projects.getById(projectId)
        .then(result => {
            return result;
        })
        .catch(err => {
            throw APIError(404, 'Project Not Found', err);
        });
}

function getByUserId(userId) {
    return Projects.getByUserId(userId)
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
    getByUserId
};
// This is a route handler file. It defines several methods which are used by
// the index.js file in this directory to actually process the message from
// the client and return an appropriate response, wrapped in a Promise.
// These functions are usually very simple.
// ============================================================================


// Import the Projects "database" model file
const Projects = require('../../../models/Projects');
const APIError = require('../../../APIError');

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

function createProject(projectData) {
    return Projects.createProject(projectData)
        .then(result => {
            return result;
        })
        .catch(err => {
            throw APIError(500, 'Project Creation Failed', err);
        });
}

function updateProject(projectId, updates) {
    return Projects.updateProject(projectId, updates)
        .then(result => {
            return result;
        })
        .catch(err => {
            throw APIError(404, 'Project Not Found', err);
        });
}

function deleteProject(projectId) {
    return Projects.deleteProject(projectId)
        .then(result => {
            return result;
        })
        .catch(err => {
            throw APIError(404, 'Project Not Found', err);
        });
}

module.exports = {
    getAll,
    getById,
    getByUserId,
    createProject,
    updateProject,
    deleteProject
};
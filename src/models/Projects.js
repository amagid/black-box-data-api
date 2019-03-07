const db = require('../../database').load();
const returnData = require('../services/return-data');
const APIError = require('../APIError');

function getAll() {
    return returnData(db.projects);
}

function getById(projectId) {
    for (project of db.projects) {
        if (project.id == projectId) {
            return returnData(project);
        }
    }

    return returnData(APIError(404, "Project Not Found"));
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

function createProject(projectData) {
    db.projects.push(projectData);
    return returnData('Project Created Successfully');
}

function updateProject(projectId, updates) {
    for (project of db.projects) {
        if (project.id == projectId) {
            Object.assign(project, updates);
            return returnData('Project Updated Successfully');
        }
    }

    return returnData(APIError(404, 'Project Not Found'));
}

function deleteProject(projectId) {
    for (let i = 0; i < db.projects.length; i++) {
        if (db.projects[i].id == projectId) {
            db.projects.splice(i, 1);
            return returnData('Project Deleted Successfully');
        }
    }

    return returnData(APIError(404, 'Project Not Found'));
}

module.exports = {
    getAll,
    getById,
    getByUserId,
    createProject,
    updateProject,
    deleteProject
};
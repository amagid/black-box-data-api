// This is the Model file for Projects. This defines all sorts of methods
// which provide basic data from the "database". This architecture is similar
// to what I'd do in production systems, but it would use an actual database.
// The model file provides only a basic interface to the database for the app.
// There is no input validation or sanitization to save time.
// ============================================================================


// Load our "database"
const db = require('../../database').load();
// Load the service which formats our response after a random delay
const returnData = require('../services/return-data');
// Load the APIError class
const APIError = require('../APIError');

// Get all of the Projects in the "database"
function getAll() {
    return returnData(db.projects);
}

// Get a Project from our "database" by our ID
function getById(projectId) {
    for (project of db.projects) {
        if (project.id == projectId) {
            return returnData(project);
        }
    }

    // If we didn't find a Project, return a 404 APIError with message for client
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
            // Copy and override all properties on -project- shared by -updates-
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

// Export an object containing all of the public methods in this file
module.exports = {
    getAll,
    getById,
    getByUserId,
    createProject,
    updateProject,
    deleteProject
};
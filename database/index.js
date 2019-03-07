'use strict';
let users = require('./users');
let projects = require('./projects');

const db = {
    users,
    projects
};

/**
 * Load the JSON files for the "database"
 * 
 * @return {Object} The current "database".
 */
function load() {
    return db;
}

module.exports = {
    load
};
// This is the "database" system, and is full of hilariously bad practice.
// It's a quick and dirty system for managing the data the application needs.
// All it does is loads pre-defined data from JSON data into live objects that
// other modules will then read and modify as necessary based on API requests.
// The upside is that nothing you do persists to disk, so if you restart the
// application, the data will be refreshed.
// ============================================================================


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

// Export load() function so other modules can access the data
module.exports = {
    load
};
// This is the main configuration module for the project. It loads the config
// data from development.json and production.json and makes that available to
// other modules that import it.

'use strict';
const dev = require('./development');
const prod = require('./production');

/**
 * Gets the current configuration
 * 
 * @return {Object} The current configuration.
 */
function get() {
    if (process.env.type === 'development') {
        return dev;
    } else if (process.env.type === 'production') {
        return prod;
    } else {
        return dev;
    }
}

// Export the get() method for use by other modules
module.exports = {
    get
};
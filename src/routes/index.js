// This is the main routing file for the root of the API. It loads child API
// sections and attaches them to the router it is passed, nesting them under
// a route prefix to keep them separate from sibling sections. Stepping through
// this code as it runs may help you understand it.
// ============================================================================


// Import Express because we need to create Express Routers here
const express = require('express');

// Import the routing system from the src/routes/api/index.js file
const mountAPI = require('./api');

// Export the addRoutes function
module.exports = addRoutes;

// This function takes an Express Router and attaches child API sections
function addRoutes(router) {

    // Create an Express Router for this API section
    const api = express.Router();
    // Attach this API section's routes to this Router
    mountAPI(api);
    // Set this Router to be used under the '/api' URL prefix. This naming may
    // seem duplicated (why call it /api when it is the only part of the API?)
    // That is because I often separate the authentication into a sibling API
    // section under '/auth'.
    router.use('/api', api);
};
// This is the main routing file for the '/api' section of the API. You may
// notice here that the routes don't say '/api' in them. That is because
// all of these routes are nested under '/api' by their parent Router.
// The '/api' is added by the router.use('/api', api) line in
// src/routes/index.js.

const express = require('express');
const respond = require('../../middlewares/respond');
const mountUsers = require('./users');
const mountProjects = require('./projects');

module.exports = function mountAPI(router) {
    // Add a route for GET requests received on the '/api/' route
    router.get('/', respond((req, res) => 'Up and running!'));

    // Add in the Users api section under this one
    const users = express.Router();
    mountUsers(users);
    router.use('/users', users);
    
    // Add in the Projects api section under this one
    const projects = express.Router();
    mountProjects(projects);
    router.use('/projects', projects);
};
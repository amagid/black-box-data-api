const express = require('express');
const respond = require('../../middlewares/respond');
const mountUsers = require('./users');
const mountProjects = require('./projects');

module.exports = function mountAPI(router) {
    router.get('/', respond((req, res) => 'Up and running!'));

    const users = express.Router();
    mountUsers(users);
    router.use('/users', users);
    
    const projects = express.Router();
    mountProjects(projects);
    router.use('/projects', projects);
};
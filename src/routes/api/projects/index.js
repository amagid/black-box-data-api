const respond = require('../../../middlewares/respond');
const projects = require('./projects');

module.exports = function mountProjects(router) {
    router.get('/', respond((req, res) => projects.getAll()));

    router.get('/:projectId', respond((req, res) => projects.getById(req.params.projectId)));

    router.get('/by-user/:userId', respond((req, res) => projects.getByUserId(req.params.userId)));
};
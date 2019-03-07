const respond = require('../../../middlewares/respond');
const projects = require('./projects');

module.exports = function mountProjects(router) {
    router.get('/', respond((req, res) => projects.getAll()));

    router.get('/:projectId', respond((req, res) => projects.getById(req.params.projectId)));

    router.get('/by-user/:userId', respond((req, res) => projects.getByUserId(req.params.userId)));
    
    router.post('/', respond((req, res) => projects.createProject(req.body)));

    router.patch('/:projectId', respond((req, res) => projects.updateProject(req.params.projectId, req.body)));

    router.delete('/:projectId', respond((req, res) => projects.deleteProject(req.params.projectId)));
};
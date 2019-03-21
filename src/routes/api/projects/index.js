// This is a fairly typical Express routing file. The function defined here
// takes a Router and assigns various functional routes to it. The basic
// structure of the route definitions is:
// router.<HTTP_VERB>(<URL_PATH>, <HANDLER_FUNCTION1>, <HANDLER_FUNCTION2>, ...)
// The url paths are automatically prefixed by the parent routers in the
// Router.use() lines in previous index.js files. Sections of URL paths that
// start with : are variable URL parameters. For example, in the '/:projectId'
// route below, any content in the URL after the last '/' will be available in
// Request.params.projectId (processed and provided for us by Express).
// ============================================================================


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
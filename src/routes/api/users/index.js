// This is a fairly typical Express routing file. The function defined here
// takes a Router and assigns various functional routes to it. The basic
// structure of the route definitions is:
// router.<HTTP_VERB>(<URL_PATH>, <HANDLER_FUNCTION1>, <HANDLER_FUNCTION2>, ...)
// The url paths are automatically prefixed by the parent routers in the
// Router.use() lines in previous index.js files. Sections of URL paths that
// start with : are variable URL parameters. For example, in the '/:userId'
// route below, any content in the URL after the last '/' will be available in
// Request.params.userId (processed and provided for us by Express).
// ============================================================================


const respond = require('../../../middlewares/respond');
const users = require('./users');

module.exports = function mountUsers(router) {
    router.get('/', respond((req, res) => users.getAll()));

    router.get('/:userId', respond((req, res) => users.getById(req.params.userId)));
    
    router.post('/', respond((req, res) => users.createUser(req.body)));

    router.patch('/:userId', respond((req, res) => users.updateUser(req.params.userId, req.body)));

    router.delete('/:userId', respond((req, res) => users.deleteUser(req.params.userId)));
};
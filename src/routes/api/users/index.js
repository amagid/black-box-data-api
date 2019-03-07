const respond = require('../../../middlewares/respond');
const users = require('./users');

module.exports = function mountUsers(router) {
    router.get('/', respond((req, res) => users.getAll()));

    router.get('/:userId', respond((req, res) => users.getById(req.params.userId)));
};
const respond = require('../../../middlewares/respond');
const users = require('./users');

module.exports = function mountUsers(router) {
    router.get('/', respond((req, res) => users.getAll()));

    router.get('/:userId', respond((req, res) => users.getById(req.params.userId)));
    
    router.post('/', respond((req, res) => users.createUser(req.body)));

    router.patch('/:userId', respond((req, res) => users.updateUser(req.params.userId, req.body)));

    router.delete('/:userId', respond((req, res) => users.deleteUser(req.params.userId)));
};
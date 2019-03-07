const respond = require('../../../middlewares/respond');
const users = require('./users');

module.exports = function mountUsers(router) {
    router.get('/', respond((req, res) => users.getAll()));
};
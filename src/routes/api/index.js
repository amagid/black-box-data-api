const respond = require('../../middlewares/respond');

module.exports = function mountAPI(router) {
    router.get('/', respond((req, res) => 'Up and running!'));
};
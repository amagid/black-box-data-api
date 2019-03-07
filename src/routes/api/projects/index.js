const respond = require('../../../middlewares/respond');
const projects = require('./projects');

module.exports = function mountProjects(router) {
    router.get('/', respond((req, res) => projects.getAll()));
};
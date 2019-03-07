const Projects = require('../../../models/Projects');

function getAll() {
    return Projects.getAll()
        .then(result => {
            return result;
        })
        .catch(err => {
            throw APIError(500, 'Unknown Error', err);
        });
}

module.exports = {
    getAll
};
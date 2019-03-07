const config = require('../../config').get();

/**
 * Return a copy of the data wrapped in a Promise
 * 
 * @param {*} data 
 */
function returnData(data, err) {
    return new Promise((resolve) => {
        setTimeout(
            resolve(
                Object.assign({}, data)
            ),
            Math.random * config.db.maxDelay
        );
    });
}

module.exports = returnData;
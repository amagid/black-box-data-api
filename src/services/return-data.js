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
                JSON.parse(JSON.stringify(data))
            ),
            Math.random * config.db.maxDelay
        );
    });
}

module.exports = returnData;
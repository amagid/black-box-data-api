const config = require('../../config').get();

/**
 * Return a copy of the data wrapped in a Promise
 * 
 * @param {*} data 
 */
function returnData(data) {
    return new Promise((resolve, reject) => {
        const resolverFunction = data instanceof Error ? 
            () => reject(data) :
            () => resolve(JSON.parse(JSON.stringify(data)))
            
        setTimeout(
            resolverFunction,
            parseInt(Math.random() * config.db.maxDelay)
        );
    });
}

module.exports = returnData;
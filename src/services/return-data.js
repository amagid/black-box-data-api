// This service is used across the "database" to do two things:
// First, it safely copies any data returned by the "database" so that once
// data is retrieved, modifying it won't modify the data in the "database".
// Second, it returns the data after a random, configurable delay.
// ============================================================================


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

// This export style just returns the function directly, so if another module
// imports it, the imported value is the function itself and can be called directly.
module.exports = returnData;
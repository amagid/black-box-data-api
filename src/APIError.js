// This class provides a simple way to define uniform errors to be returned by
// the API to the client.

'use strict';
module.exports = (status, message) => { return new APIError(status, message) };

class APIError extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}
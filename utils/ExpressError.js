// Create a new custom Express Error Handel Class
class ExpressError extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}


module.exports = ExpressError;
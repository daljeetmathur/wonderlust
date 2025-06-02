class ExpressError extends Error {
    constructor(statusCode, message) {
        super(); // Call the parent class constructor with the message				
        this.statusCode = statusCode; // Set the status property				
        this.message = message; // Set the status property				
    }
}

module.exports = ExpressError;				
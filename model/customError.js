class CustomError {
    statusCode
    message

    constructor(statusCode, message) {
        this.statusCode = statusCode
        this.message = message
    }
}

module.exports = CustomError
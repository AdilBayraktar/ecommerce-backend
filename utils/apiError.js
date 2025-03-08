/*
@desc This class is responsible for handling errors in the API
*/

class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "Fail" : "Error";
    this.message = message;
    this.isOperational = true;
  }
}

module.exports = ApiError;

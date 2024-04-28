class AppError extends Error {
  constructor(statusCode = 500, message = "Somthing went wrong") {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

export default AppError;

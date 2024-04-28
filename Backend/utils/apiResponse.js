class AppResponse {
  constructor(statusCode, data, message, success = true) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = success;
  }
}
export default AppResponse;
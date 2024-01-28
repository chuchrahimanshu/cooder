class ResponseHandler {
  constructor(
    statusCode,
    message = "Response Success",
    userMessage = "Success",
    data = null,
    success = true,
    error = false
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.userMessage = userMessage;
    this.data = data;
    this.success = success;
    this.error = error;
  }
}

export { ResponseHandler };

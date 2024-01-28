class ErrorHandler extends Error {
  constructor(
    statusCode,
    message = "Internal Server Error!",
    userMessage = null,
    data = null,
    success = false,
    error = true,
    stack = null
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.userMessage = userMessage ? userMessage : message;
    this.data = data;
    this.success = success;
    this.error = error;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ErrorHandler };

const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      console.log("ERROR = ", error);
      next(error);
    });
  };
};

export { asyncHandler };

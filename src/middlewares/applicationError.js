export default class ApplicationError extends Error {
  constructor(message, code) {
    super(message);
    this.statusCode = code;
  }
}

export const errorHandlerMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "server error! Try later!!";
  res.status(err.statusCode).json({ success: false, error: err.message });
  next();
};

//handles all not found API
const notFound = (req, res) => {
  const error = new Error(`Not Found: ${req.originalUrl}`);
  res.status(404).json({ message: error.message });
};
//handles all error cases
const errorHandler = (err, req, res) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode).json({ message: err.message });
};

export { notFound, errorHandler };

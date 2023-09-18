function errorHandler(err, req, res, next) {
  console.log(err);
  res.status(err.status || 400).json({ status: false, errors: err.errors });
}

module.exports = errorHandler;

function errorHandler(err, req, res, next) {
  res.status(err.status || 400).json({ status: false, errors: [err] });
}

module.exports = errorHandler;

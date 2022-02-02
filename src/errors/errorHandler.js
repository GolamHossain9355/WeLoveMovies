function errorHandler(err, req, res, next) {
  const { status = 500, msg = "Something went wrong" } = err;
  res.status(status).json({ error: msg });
}

module.exports = errorHandler;

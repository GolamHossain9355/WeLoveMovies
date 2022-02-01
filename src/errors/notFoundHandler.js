function notFoundHandler(req, res, next) {
  return next({
    status: 404,
    msg: `Path not found ${req.originalUrl}`,
  });
}

module.exports = notFoundHandler;

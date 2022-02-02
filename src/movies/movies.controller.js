const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const foundMovie = await service.read(movieId);
  if (!foundMovie) {
    return next({
      status: 404,
      msg: "Movie cannot be found.",
    });
  }
  res.locals.foundMovie = foundMovie;
  next();
}

async function list(req, res, _next) {
  const { is_showing } = req.query;

  if (is_showing === "true") {
    const data = await service.listIsShowing();
    res.status(200).json({ data });
  }

  const data = await service.list();
  res.status(200).json({ data });
}

async function read(req, res, _next) {
  const { foundMovie: data } = res.locals;
  res.status(200).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [movieExists, asyncErrorBoundary(read)],
};

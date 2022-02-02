const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./theaters.service");

async function list(req, res, _next) {
  const { movieId } = req.params;
  if (movieId) {
    const data = await service.listTheatersForMovie(movieId);
    return res.status(200).json({ data });
  }
  const data = await service.list();
  res.status(200).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};

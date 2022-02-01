const service = require("./reviews.service");

const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const mapProperties = require("../utils/map-properties");

const addCategory = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  created_at: "critic.created_at",
  updated_at: "critic.updated_at",
});

async function reviewExists(req, res, next) {
  const { reviewId } = req.params;
  const data = await service.read(reviewId);
  if (!data) {
    return next({
      status: 404,
      msg: "Review cannot be found",
    });
  }
  next();
}

async function listReviewsForMovie(req, res, _next) {
  const { movieId } = req.params;

  const arrayData = await service.listReviewsForMovie(movieId);
  const data = arrayData.map((addCategory));

  res.status(200).json({ data });
}

async function update(req, res, _next) {
  const { reviewId } = req.params;
  const newData = { ...req.body.data };
  const data = await service.update(newData, reviewId);
  res.status(200).json({ data });
}

async function destroy(req, res, _next) {
  const { reviewId } = req.params;
  await service.delete(reviewId);
  res.sendStatus(204);
}

module.exports = {
  listReviewsForMovie: asyncErrorBoundary(listReviewsForMovie),
  update: [reviewExists, asyncErrorBoundary(update)],
  delete: [reviewExists, asyncErrorBoundary(destroy)],
};

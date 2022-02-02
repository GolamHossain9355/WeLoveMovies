const knex = require("../db/connection");

function readCritic(critic_id) {
  return knex("critics").where({ critic_id }).first();
}

async function addCritic(review) {
  review.critic = await readCritic(review.critic_id);
  return review;
}

async function listReviewsForMovie(movie_id) {
  const reviews = await knex("reviews").where({ movie_id });
  return await Promise.all(reviews.map(addCritic));
}

function read(review_id) {
  return knex("reviews").where({ review_id }).first();
}

async function update(updatedData, review_id) {
  await knex("reviews").where({ review_id }).update(updatedData, "*");
  const review = await read(review_id);
  return addCritic(review);
}

function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  listReviewsForMovie,
  addCritic,
  read,
  update,
  delete: destroy,
};

// function listReviewsForMovie(movieId) {
//   return knex("reviews as r")
//     .join("critics as c", "r.critic_id", "c.critic_id")
//     .select(
//       "*",
//       "r.created_at as created_at_reviews",
//       "r.updated_at as updated_at_reviews",
//       "r.critic_id as critic_id_reviews"
//     )
//     .where({ "r.movie_id": movieId });
// }

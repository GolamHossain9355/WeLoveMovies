const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

function readAllMoviesInTheater(theater_id) {
  return knex("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .where({ "mt.theater_id": theater_id });
}

async function addMoviesArray(theaters) {
  const data = await Promise.all(
    theaters.map(async (theater) => {
      theater.movies = await readAllMoviesInTheater(theater.theater_id);
      return theater;
    })
  );
  return data;
}

function list() {
  return knex("theaters").select();
}

function listTheatersForMovie(movieId) {
  return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .join("movies as m", "mt.movie_id", "m.movie_id")
    .select("t.*", "m.movie_id")
    .where({ "m.movie_id": movieId });
}

module.exports = {
  listTheatersForMovie,
  list,
  addMoviesArray,
};

// const moviesReduce = reduceProperties("theater_id", {
//   movie_id: ["movies", null, "movie_id"],
//   title: ["movies", null, "title"],
//   runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
//   rating: ["movies", null, "rating"],
//   description: ["movies", null, "description"],
//   image_url: ["movies", null, "image_url"],
// });

// async function list() {
//   return knex("theaters as t")
//     .join(
//       "movies_theaters as mt",
//       "mt.theater_id",
//       "t.theater_id"
//     )
//     .join("movies as m", "m.movie_id", "mt.movie_id")
//     .then(moviesReduce);
// }

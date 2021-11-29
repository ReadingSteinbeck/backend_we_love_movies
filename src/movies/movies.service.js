const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function listIsShowing() {
  return knex("movies as m")
    .join("movies_theaters as mv", "m.movie_id", "mv.movie_id")
    .select("m.*")
    .distinct("m.*")
    .where({ "mv.is_showing": true });
}

function read(movieId) {
  return knex("movies as m ")
    .select("m.*")
    .where({ "m.movie_id": movieId })
    .first();
}
function readTheaters(movieId) {
  return knex("movies as m ")
    .join("movies_theaters as mv", "m.movie_id", "mv.movie_id")
    .join("theaters as t", "mv.theater_id", "t.theater_id")
    .select("t.*")
    .where({ "m.movie_id": movieId });
}

function readReviews(movieId) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movieId })
    .then((reviews) => {
      return reviews.map((review) => {
        return {
          review_id: review.review_id,
          content: review.content,
          score: review.score,
          created_at: review.created_at,
          updated_at: review.updated_at,
          critic_id: review.critic_id,
          movie_id: review.movie_id,
          critic: {
            critic_id: review.critic_id,
            preferred_name: review.preferred_name,
            surname: review.surname,
            organization_name: review.organization_name,
            created_at: review.created_at,
            updated_at: review.updated_at,
          },
        };
      });
    });
}

module.exports = {
  list,
  listIsShowing,
  read,
  readTheaters,
  readReviews,
};

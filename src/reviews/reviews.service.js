const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function listCritics(criticId) {
  return knex("critics as c")
    .select("*")
    .where({ "c.critic_id": criticId })
    .first();
}
function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}
function destroy(reviewId) {
  return knex("reviews").where({ review_id: reviewId }).del();
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
}

module.exports = {
  listCritics,
  read,
  update,
  delete: destroy,
};

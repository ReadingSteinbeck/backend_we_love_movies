const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Middleware

async function reviewExists(req, res, next) {
  const review = await reviewsService.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({ status: 404, message: `Review cannot be found.` });
}

//HTTP VERB

async function update(req, res, next) {
  const updatedReview = {
    ...res.locals.review,
    ...req.body.data,
    // review_id: res.locals.review.review_id,
  };

  //   const data = await reviewsService.update(updatedReview).join();
  //   res.json({ data });
  //   next();

  await reviewsService.update(updatedReview);
  updatedReview.critic = await reviewsService.listCritics(
    updatedReview.critic_id
  );
  res.json({ data: updatedReview });
}

async function destroy(req, res) {
  const { review } = res.locals;
  await reviewsService.delete(review.review_id);
  res.sendStatus(204);
}

module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};

const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

//Middleware
async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

//HTTP verbs
async function list(req, res) {
  if (req.query.is_showing) {
    const data = await moviesService.listIsShowing();
    res.json({ data });
  } else {
    const data = await moviesService.list();
    res.json({ data });
  }
}

function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function readTheaters(req, res, next) {
  res.json({
    data: await moviesService.readTheaters(res.locals.movie.movie_id),
  });
}

async function readReviews(req, res, next) {
  res.json({
    data: await moviesService.readReviews(res.locals.movie.movie_id),
  });
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), read],
  readTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readTheaters),
  ],
  readReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(readReviews),
  ],
  list: asyncErrorBoundary(list),
};

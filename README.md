WeLoveMovies is an app designed to give users access to movie, theater and review data form a database.

### GET /movies route

This route returns an array of movie objects with information on movie title, runtime, rating, and description.

### GET /movies?is_showing=true

This route returns an array of movie objects that are currently in theaters with information on movie title, runtime, rating, and description.

### GET /movies/:movieId route

This route returns the same data as the first route described above but for a single movie thats matches the movieId parameter.

### GET /movies/:movieId/theaters

This route returns an array of theaters in which the selected movie is showing.

### GET /movies/:movieId/reviews

This route returns an array of reviews for a movie, each review includes information pertaining to the critic who made the review.

### DELETE /reviews/:reviewId

This route allows the user to delete a specified review.

### UPDATE /reviews/:reviewId

This route allows the user to update a specified review.

### GET /theaters

This route returns an array of theaters with each theater containing a movie property that contains an array of the movies showing at that theater.

### Technologies and tools used to create WeLoveMovies

The database used was elephantSQL which is a cloud-hosted PostgreSQL database.

The SQL Query Builder used in this project was Knex.js.

This project was built using Node.js and Express

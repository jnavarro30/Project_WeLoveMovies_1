const service = require("./movies.service");
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// middleware
async function movieExists(req, res, next) {
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({
    status: 404,
    message: `Movie not found.`
  })
}

// CRUDL
async function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ movie });
}

async function list(req, res) {
    const data = await service.list();
    res.json({ data });
}

module.exports = {
    read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
    list: asyncErrorBoundary(list)
}
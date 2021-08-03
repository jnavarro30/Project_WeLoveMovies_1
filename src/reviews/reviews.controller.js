const service = require('./reviews.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// middleware
async function reviewExists(req, res, next) {
  const review = req.body.data;
  if (review) {
    res.locals.review = review;
    return next();
  }
  next({
    status: 404,
    message: 'Not Found.'
  })
}

// CRUDL
async function update(req, res) {
  const { review } = res.locals;
  const updatedReview = {
    ...req.body.data,
    review_id: review.review_id
  }
  
  const data = await service.update(updatedReview);
  res.json({ data });
}

async function destroy(req, res) {
  const { review } = res.locals;
  await service.delete(review.review_id);
  res.sendStatus(204);
}
module.exports = {
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)]
}
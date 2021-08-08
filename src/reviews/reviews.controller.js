const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// middleware
async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
    const review = await service.read(reviewId);

    if (review) {
        res.locals.review = review;
        return next();
    }

    next({
        status: 404,
        message: `Review cannot be found.`
    })
}
// CRUDL
async function destroy(req, res) {
    const {
        review
    } = res.locals;
    await service.delete(review.review_id);
    res.sendStatus(204);
}

async function update(req, res) {
    const { data } = req.body;
    const { review } = res.locals;
    const updatedReview = {
        ...review,
        ...data
        
    }
    await service.update(updatedReview);
    updatedReview.critic = await service.criticList(updatedReview.critic_id)

    res.json({
        data: updatedReview
    })
}

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)]
}
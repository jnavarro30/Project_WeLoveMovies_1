const knex = require('../db/connection');

function update(updatedReview) {
    return knex('reviews')
        .select('*')
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, '*')
        .then((updatedRecords) => updatedRecords[0]);
        //.first()?
}

function destroy(review_id) {
    return knex('reviews')
        .select('*')
        .where({ review_id })
        .del();
}

module.exports = {
    update,
    delete: destroy
}
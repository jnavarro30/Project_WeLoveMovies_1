const knex = require("../db/connection");


function list() {
    return knex("theaters").select("*");
}

function addMovies(theater_id) {
    return knex("movies_theaters as mt")
        .join("movies as m", "mt.movie_id", "m.movie_id")
        .where({theater_id})
        .select("m.*", "mt.created_at", "mt.updated_at", "mt.is_showing", "mt.theater_id" )
}

module.exports = {
    list, addMovies,
}
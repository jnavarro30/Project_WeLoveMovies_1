const knex = require("../db/connection");

// CRUDL
function read(movie_id) {
  return knex('movies')
    .select('*')
    .where({ movie_id })
    .first();
}

function list() {
    return knex('movies')
        .select('*');
}

module.exports = {
  read,
  list
}
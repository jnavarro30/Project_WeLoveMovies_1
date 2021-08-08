const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res, next) {
    const data = await service.list(req.query.is_showing);
    res.json({ data })
}

async function movieExists(req, res, next) {
    const { movieId } = req.params;
    const movie = await service.read(movieId);
    if(movie) {
        res.locals.movieId = movieId;
        res.locals.movie = movie;
        return next();
    }
   next({ status: 404, message: `Movie cannot be found.` })
}


function read(req, res) {
    const { movie } = res.locals;
    res.json({ data: movie })
}

//check movie_theaters table for theater info
async function readTheaters(req, res) {
    const { movieId } = res.locals;
    const theaters = await service.readTheaters(movieId);
    res.json({ data: theaters })  
}

async function readReviews(req, res) {
    const { movieId } = res.locals;
    const reviews = await service.readReviews(movieId);
    res.json({ data: reviews })
}

module.exports = {
    
    read: [asyncErrorBoundary(movieExists), read],
    readTheaters: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readTheaters)],
    readReviews: [asyncErrorBoundary(movieExists), asyncErrorBoundary(readReviews)],
    list: asyncErrorBoundary(list),

};
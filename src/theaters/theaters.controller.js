const service = require("./theaters.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req, res) {
    const theaters = await service.list();
    for(let theater of theaters){
        const movieList = await service.addMovies(theater.theater_id);
        theater["movies"] = movieList;
    }
    console.log(theaters);
    res.json({ data: theaters })
}

module.exports = {
  list: [asyncErrorBoundary(list)],
}
const service = require('./theaters.service');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

// CRUDL
async function list(req, res) {
    const data = await service.list();
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list)
}
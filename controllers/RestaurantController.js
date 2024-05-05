function index(req, res) {
    return res.json('ok')
}

function insert(req, res) {
    return res.json('insert')
}

module.exports = {
    index, insert
}
//index
function index(req, res) {
    res.json({
        message: 'Movie index'
    });
}

//show
function show(req, res) {
    res.json({
        message: 'Movie show'
    });
}

module.exports = {
    index,
    show
};
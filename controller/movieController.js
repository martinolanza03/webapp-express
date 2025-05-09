const connection = require('../data/db.js');

//index
function index(req, res) {
    const sql = 'SELECT * FROM movies';

    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore nel collegamento con il Database' });
        res.json(results);
    });
}

//show
function show(req, res) {
    res.json({
        message: 'Movie show'
    });
}


// export function
module.exports = { index, show };
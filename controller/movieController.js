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
    const { id } = req.params;

    const sql = 'SELECT * FROM movies WHERE id = ?';

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore nel collegamento con il Database' });
        if (results.length === 0) return res.status(404).json({ error: 'Film non trovato' });

        res.json(results[0]);
    });
}


// export function
module.exports = { index, show };
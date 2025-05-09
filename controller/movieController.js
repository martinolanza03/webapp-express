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

        const movie = results[0];

        //review

        const sqlreview = 'SELECT text, name, vote FROM reviews WHERE movie_id = ?';

        connection.query(sqlreview, [id], (err, results) => {
            if (err) { }

            movie.reviews = results;
            res.json(movie);
        });
    });




}


// export function
module.exports = { index, show };
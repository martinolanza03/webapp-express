const connection = require('../data/db.js');

//index
function index(req, res) {
    const sql = 'SELECT * FROM movies';

    // eseguiamo la query!
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore nel collegamento con il Database' });
        res.json(results.map(result => ({
            ...result,
            image: `${process.env.PUBLIC_PATH}img/${result.image}`
        })));
    });
}

//show
function show(req, res) {
    const { id } = req.params;

    const sql = 'SELECT movies.*, ROUND(AVG(reviews.vote), 0) AS media_voto FROM movies INNER JOIN reviews ON movies.id = reviews.movie_id WHERE movie_id = ?';

    connection.query(sql, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore nel collegamento con il Database' });
        if (results.length === 0) return res.status(404).json({ error: 'Film non trovato' });

        const movie = {
            ...results[0],
            image: `${process.env.PUBLIC_PATH}img/${results[0].image}`
        };

        //review

        const sqlreview = 'SELECT movies.*, reviews.* FROM movies INNER JOIN reviews ON movies.id = reviews.movie_id WHERE movie_id = ?';

        connection.query(sqlreview, [id], (err, results) => {
            if (err) console.log(err);

            movie.reviews = results;
            res.json(movie);
        });
    });

}

function createReview(req, res) {
    const { id } = req.params;
    const { name, text, vote } = req.body;

    sql = 'INSERT INTO movies.reviews ( movie_id, name, text, vote) VALUES (?, ?, ?, ?)';
    // eseguiamo la query!
    connection.query(sql, [id, name, text, vote], (err, results) => {
        if (err) return res.status(500).json({ error: 'Errore nel collegamento con il Database' });
        if (results.length === 0) return res.status(404).json({ error: 'Film non trovato' });

        res.status(201).json({ message: 'Recensione creata con successo' });
    });

}

// export function
module.exports = { index, show, createReview };
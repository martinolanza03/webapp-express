const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const movieRouter = require('./routers/movieRouter');

//Call routes in movieRouter.js
app.use('/movies', movieRouter);

//Server port
app.listen(port, () => {
    console.log(`Server avviato nella porta ${port}`);
});

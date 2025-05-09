const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const movieRouter = require('./routers/movieRouter');

//Middleware
const errorsHandler = require('./middleware/errorHandler.js');
const notFound = require('./middleware/notFound.js');

//Call routes in movieRouter.js
app.use('/movies', movieRouter);


//Call the middleware
//Route Not Found
app.use(notFound);

//Error in the code
app.use(errorsHandler);

//Server port
app.listen(port, () => {
    console.log(`Server avviato nella porta ${port}`);
});

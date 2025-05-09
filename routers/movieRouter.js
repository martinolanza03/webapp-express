const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

//index, shaw all element
router.get('/', movieController.index);

//index, shaw element by id
router.get('/:id', movieController.show);


module.exports = router;
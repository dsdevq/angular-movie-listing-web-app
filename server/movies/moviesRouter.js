const Router = require('express');
const router = new Router();
const controller = require('./moviesController');
const checkIfAuthenticated = require('../middleware/authentication.js');

router.post('/movie', checkIfAuthenticated, controller.postNewItem);

router.post('/suggest-someone', controller.suggestSomeone);

router.post('/movie', checkIfAuthenticated, controller.postNewItem);

module.exports = router;

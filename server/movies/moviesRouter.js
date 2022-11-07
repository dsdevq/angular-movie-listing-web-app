const Router = require('express');
const router = new Router();
const controller = require('./moviesController');
const { check } = require('express-validator');
const checkIfAuthenticated = require('../middleware/authentication.js');

router.post(
	'/:movie/:id',
	// [
	// 	check('email', 'Name cant be empty!').notEmpty(),
	// 	check('password', 'Min length = 3, max = 10').isLength({ min: 3, max: 10 }),
	// ],
	controller.suggest
);

module.exports = router;

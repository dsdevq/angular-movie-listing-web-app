const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');
const checkIfAuthenticated = require('../middleware/authentication.js');

router.post(
	'/registration',
	[
		check('email', 'Email cant be empty!').notEmpty(),
		// check('username', 'Username cant be empty').notEmpty(),
		check('password', 'Min length = 3, max = 10').isLength({ min: 3, max: 10 }),
	],
	controller.registration
);
// router.post('/login', checkIfAuthenticated, controller.login);
// router.get('/users', controller.getUsers);

router.post('/login', controller.login);

router.get('/data', checkIfAuthenticated, controller.getUserData);

router.post('/movie', checkIfAuthenticated, controller.postNewItem);
module.exports = router;

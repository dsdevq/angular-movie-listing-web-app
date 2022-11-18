const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require('express-validator');

router.post(
	'/registration',
	[
		check('email', 'Name cant be empty!').notEmpty(),
		check('password', 'Min length = 3, max = 10').isLength({ min: 3, max: 10 }),
	],
	controller.registration
);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

module.exports = router;

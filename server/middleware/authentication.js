const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const checkIfAuthenticated = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) {
		next();
		// return res.sendStatus(401);
	}
	jwt.verify(token, secret, (err, user) => {
		if (err) res.sendStatus(403);
		req.user = user;
		next();
	});
};

module.exports = checkIfAuthenticated;

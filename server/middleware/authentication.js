const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const checkIfAuthenticated = (req, res, next) => {
	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];
	if (!token) {
		next();
		return res.sendStatus(401);
	}
	jwt.verify(token, secret, (err, user) => {
		if (err)
			return res
				.status(403)
				.json({ message: 'Invalid token, probably expired' });
		req.user = user;
		next();
	});
};

module.exports = checkIfAuthenticated;

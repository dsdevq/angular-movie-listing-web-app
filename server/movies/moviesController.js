const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../config');

const generateAccessToken = (id, roles) => {
	const payload = {
		id,
		roles,
	};
	// return jwt.sign(payload, secret, { expiresIn: '24h' });
	expiresIn = '24h';
	return {
		idToken: jwt.sign(payload, secret, { expiresIn }),
		expiresIn: expiresIn,
	};
};

class moviesController {
	async suggest(req, res) {
		try {
			const movie = req.body;

			if (!req.user) {
				res.status(401).json({ message: movie });
				res.status(401).json({ message: 'Please, login!' });
			}
			return res.status(200).json({ message: id, isSuggested });

			// const candidate = await User.findOne({ email });
			// if (candidate) {
			// 	return res
			// 		.status(400)
			// 		.json({ message: 'User with such email is already exists' });
			// }
			// const hashPassword = bcrypt.hashSync(password, 7);
			// const userRole = await Role.findOne({ value: 'USER' });

			// const user = new User({
			// 	email,
			// 	password: hashPassword,
			// 	roles: [userRole.value],
			// });
			// console.log(user);

			// await user.save();

			// return res.json({ message: 'User has been successfully registered' });
		} catch (error) {
			console.log(error);

			res.status(400).json({
				message: `Registration Error - ${error}}`,
			});
		}
	}
}

module.exports = new moviesController();

const User = require('./models/User');
const Role = require('./models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require('./config');

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

class authController {
	async registration(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Registration failed', errors });
			}
			const { email, password } = req.body;
			const candidate = await User.findOne({ email });
			if (candidate) {
				return res
					.status(400)
					.json({ message: 'User with such email is already exists' });
			}
			const hashPassword = bcrypt.hashSync(password, 7);
			const userRole = await Role.findOne({ value: 'USER' });

			const user = new User({
				email,
				password: hashPassword,
				roles: [userRole.value],
			});
			console.log(user);

			await user.save();

			return res.json({ message: 'User has been successfully registered' });
		} catch (error) {
			console.log(error);

			res.status(400).json({
				message: `Registration Error - ${error}}`,
			});
		}
	}

	async login(req, res) {
		try {
			const { email, password } = req.body;
			const user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json(`No users with such email - ${email}`);
			}
			const validPassword = bcrypt.compareSync(password, user.password);
			if (!validPassword) {
				return res.status(400).json('Invalid password');
			}
			const token = generateAccessToken(user._id, user.roles);
			return res
				.status(200)
				.json({ ...token, email: user.email, roles: user.roles });
		} catch (error) {
			console.log(error);
			res.status(400).json({ message: 'Login Error' });
		}
	}
	async getUsers(req, res) {
		try {
			const users = await User.find();
			res.json(users);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new authController();

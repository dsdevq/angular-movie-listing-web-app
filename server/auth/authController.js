const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { secret } = require('../config');

const generateAccessToken = (id, roles) => {
	const payload = {
		id,
		roles,
	};
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
			const { email, password, username } = req.body;
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
				username,
				password: hashPassword,
				movies: [],
				manual_suggestions: [],
				suggestions: [],
				tvShows: [],
				roles: [userRole.value],
			});

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
			return res.status(200).json({
				...token,
				email: user.email,
				roles: user.roles,
				movies: user.movies,
				tvShows: user.tvShows,
				suggestions: user.suggestions,
				manual_suggestions: user.manual_suggestions,
			});
		} catch (error) {
			console.log(error);
			res.status(400).json({ message: 'Login Error' });
		}
	}
	async getUserData(req, res) {
		try {
			let authorizedUser = req.user;
			const user = await User.findOne({ _id: authorizedUser.id });
			if (!user) {
				res.sendStatus(404);
			}
			res.set('Access-Control-Allow-Origin', 'http://localhost:4200');
			res.json(user);
		} catch (error) {
			console.log(error);
		}
	}

	async postNewItem(req, res) {
		try {
			let authorizedUser = req.user;
			const user = await User.findById(authorizedUser.id);
			if (!user) {
				res.status(404).json({ message: 'No user' });
			}
			const item = req.body;
			if (item.type === 'movie') {
				await User.updateOne(
					{ _id: user._id },
					{
						$push: {
							movies: item,
						},
					}
				);
			}
			if (item.type === 'tv') {
				await User.updateOne(
					{ _id: user._id },
					{
						$push: {
							tvShows: item,
						},
					}
				);
			}
			return res
				.status(200)
				.json({ message: `item successfully added`, successful: true });
		} catch (error) {
			console.log(error);
		}
	}
	async suggestSomeone(req, res) {
		try {
			let authorizedUser = req.user;
			const user = await User.findById(authorizedUser.id);
			if (!user) {
				res.status(404).json({ message: 'No user' });
			}
			const item = req.body;
			await User.updateOne(
				{ _id: user._id },
				{
					$push: {
						manual_suggestions: item,
					},
				}
			);
			return res
				.status(200)
				.json({ message: `item successfully added`, successful: true });
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new authController();

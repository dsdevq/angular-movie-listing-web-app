const User = require('../models/User');

class moviesController {
	async postNewItem(req, res) {
		try {
			let { id } = req.user;
			const user = await User.findById(id);
			if (!user) {
				res.status(404).json({ message: 'No user' });
			}
			const item = { ...req.body, isAdded: true };
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
			let authUser = req.user;
			const user = authUser && (await User.findById(authUser.id));
			const item = { ...req.body };

			if (!user) {
				await User.updateOne(
					{ username: 'Admin' },
					{
						$push: {
							suggestions: { ...item, isSuggested: true },
						},
					}
				);
				return res
					.status(200)
					.json({ message: `item successfully added`, successful: true });
			}
			await User.updateOne(
				{ _id: user._id },
				{
					$push: {
						manual_suggestions: { ...item, isManualSuggestion: true },
					},
				}
			);
			await User.updateOne(
				{ username: 'Admin' },
				{
					$push: {
						suggestions: { ...item, isSuggested: true },
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

module.exports = new moviesController();

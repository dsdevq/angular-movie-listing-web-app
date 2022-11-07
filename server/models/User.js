let { Schema, model } = require('mongoose');

const User = new Schema({
	email: { type: String, unique: true, required: true },
	username: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	movies: [{ type: Object, ref: 'Movie' }],
	tvShows: [{ type: Object, ref: 'Movie' }],
	suggestions: [{ type: Object, ref: 'Movie' }],
	manual_suggestions: [{ type: Object, ref: 'Movie' }],
	roles: [{ type: String, ref: 'Role' }],
});

module.exports = model('User', User);

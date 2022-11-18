let { Schema, model } = require('mongoose');

const Movie = new Schema({
	id: { type: Number, unique: true, required: true },
	type: { type: String, required: true },
	title: { type: String, required: true },
	poster_path: { type: String, required: true },
	isSuggested: { type: Boolean, default: false },
});

module.exports = model('Movie', Movie);

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const authRouter = require('./auth/authRouter');
const moviesRouter = require('./movies/moviesRouter');
// require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/post', moviesRouter);

const start = async () => {
	try {
		await mongoose.connect(
			'mongodb+srv://denis:1111@cluster0.kro2ufb.mongodb.net/?retryWrites=true&w=majority'
		);
		app.listen(PORT, () => {
			console.log(`Server is running on PORT: ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();

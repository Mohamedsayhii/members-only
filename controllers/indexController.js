const bcrypt = require('bcryptjs');
const db = require('../database/queries');
const { body, validationResult } = require('express-validator');
const passport = require('passport');
const alphaErr = 'must only contain letters.';
const alphaNumericErr = 'must only contain letters and numbers.';
const firstNameErr = 'must be between 1 and 12 characters.';
const userNameErr = 'must be between 1 and 12 characters.';
const passwordErr = 'must be at least 6 characters.';

const validateSignup = [
	body('firstname')
		.trim()
		.isAlpha()
		.withMessage(`First name ${alphaErr}`)
		.isLength({ min: 1, max: 12 })
		.withMessage(`First name ${firstNameErr}`),
	body('lastname')
		.trim()
		.isAlpha()
		.withMessage(`Last name ${alphaErr}`)
		.isLength({ min: 1, max: 12 })
		.withMessage(`Last name ${firstNameErr}`),
	body('username')
		.trim()
		.isAlphanumeric()
		.withMessage(`User name ${alphaNumericErr}`)
		.isLength({ min: 1, max: 20 })
		.withMessage(`User name ${userNameErr}`)
		.custom(async (username) => {
			const user = await db.getUser(username);
			if (user) {
				throw new Error(`Username already taken.`);
			}
		}),
	body('password')
		.isLength({ min: 6 })
		.withMessage(`Password ${passwordErr}`),
	body('confirmPassword')
		.custom((value, { req }) => {
			return value === req.body.password;
		})
		.withMessage(`Password and confirm password doesn't match.`),
];

exports.getLoginPage = (req, res) => {
	const { messages } = req.session;

	res.render('login', {
		title: 'Log In',
		errors: messages ? [{ msg: messages.pop() }] : [],
	});
};

exports.postLogin = passport.authenticate('local', {
	successRedirect: '/home',
	failureRedirect: '/',
	failureMessage: true,
});

exports.getSignupPage = (req, res) => {
	res.render('signup', { title: 'Sign Up' });
};

exports.postSignup = [
	validateSignup,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('signup', {
				title: 'Sign Up',
				errors: errors.array(),
			});
		}

		const { firstname, lastname, username, password } = req.body;
		const cryptedPassword = await bcrypt.hash(password, 10);

		await db.insertUser(
			firstname,
			lastname,
			username,
			cryptedPassword,
			'guest'
		);
		res.redirect('/');
	},
];

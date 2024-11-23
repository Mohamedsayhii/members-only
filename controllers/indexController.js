const { body, validationResult } = require('express-validator');

exports.getLoginPage = (req, res) => {
	res.render('login', { title: 'Log In' });
};

exports.getSignupPage = (req, res) => {
	res.render('signup', { title: 'Sign Up' });
};

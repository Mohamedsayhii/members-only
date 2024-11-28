const db = require('../database/queries');
const { body, validationResult } = require('express-validator');

validateSecret = [
	body('secret')
		.notEmpty()
		.trim()
		.equals('Black Hoodie')
		.withMessage(`Wrong Secret Passcode.`),
];

exports.getHomepage = async (req, res) => {
	const messages = await db.getMessages();
	res.render('homepage', { messages: messages });
};

exports.getMessageForm = (req, res) => {
	res.render('messageForm', { title: 'New Message' });
};

exports.postMessageForm = async (req, res) => {
	const { title, text } = req.body;
	const userId = req.session.passport.user;
	const [user] = await db.getUserById(userId);
	await db.insertMessage(title, text, user.username);
	res.redirect('/home');
};

exports.getMembershipForm = (req, res) => {
	res.render('membershipForm', { title: 'Membership' });
};

exports.postMembershipForm = [
	validateSecret,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log('wrong');
			return res.status(400).render('membershipForm', {
				title: 'Membership',
				errors: errors.array(),
			});
		}

		const [user] = await db.getUserById(req.session.passport.user);
		await db.changeMembership(user.username);
		res.redirect('/home');
	},
];

exports.getLogout = (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
};

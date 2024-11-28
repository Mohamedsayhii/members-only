const db = require('../database/queries');

exports.getHomepage = async (req, res) => {
	const messages = await db.getMessages();
	res.render('homepage', { messages: messages });
};

exports.getMessageForm = (req, res) => {
	res.render('messageForm', { title: 'New Message' });
};

exports.postMessagesForm = async (req, res) => {
	const { title, text } = req.body;
	const userId = req.session.passport.user;
	const [user] = await db.getUserById(userId);
	await db.insertMessage(title, text, user.username);
	res.redirect('/home');
};

exports.getLogout = (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
};

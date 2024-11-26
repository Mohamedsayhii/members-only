exports.getHomepage = (req, res) => {
	res.render('homepage');
};

exports.getMessageForm = (req, res) => {
	res.render('messageForm', { title: 'New Message' });
};

exports.getLogout = (req, res, next) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect('/');
	});
};

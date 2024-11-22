const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = db.getUser(username);
			if (!user) {
				return done(null, false, { message: 'Incorrect Username' });
			}

			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				return done(null, false, { message: 'Incorrect Password' });
			}
		} catch (err) {
			return done(err);
		}
	})
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
	try {
		const user = db.getUserById(id);
		done(null, user);
	} catch (err) {
		done(err);
	}
});

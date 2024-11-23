const express = require('express');
const path = require('node:path');
const passport = require('passport');
const session = require('express-session');
const pgStore = require('connect-pg-simple')(session);

require('dotenv').config();

// GENERAL SETUP
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// SESSION SETUP
const sessionStore = new pgStore({
	conString: process.env.DB_STRING,
	tableName: 'sessions',
});

app.use(
	session({
		store: sessionStore,
		secret: 'cats',
		resave: false,
		saveUninitialized: false,
	})
);

// PASSPORT AUTHENTICATION
require('./config/passport');
app.use(passport.session());

// ROUTES
const indexRouter = require('./routes/indexRouter');

app.use('/', indexRouter);

app.listen(3000, () => console.log('express server listening on port 3000'));

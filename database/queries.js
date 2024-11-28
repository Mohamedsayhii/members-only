const pool = require('./pool');

async function getUser(username) {
	const { rows } = await pool.query(
		'SELECT * FROM users WHERE username = ($1)',
		[username]
	);
	return rows;
}

const getUserById = async (id) => {
	const { rows } = await pool.query('SELECT * FROM users WHERE id = ($1)', [
		id,
	]);
	return rows;
};

const insertUser = async (
	firstname,
	lastname,
	username,
	password,
	membership
) => {
	await pool.query(
		'INSERT INTO users (firstname, lastname, username, password, membership) VALUES($1, $2, $3, $4, $5)',
		[firstname, lastname, username, password, membership]
	);
};

const getMessages = async () => {
	const { rows } = await pool.query(
		'SELECT title, date, text, username FROM messages'
	);
	return rows;
};

const insertMessage = async (title, text, username) => {
	const date = new Intl.DateTimeFormat('en-GB', {
		weekday: 'long',
		day: '2-digit',
		month: 'long',
		year: 'numeric',
	}).format(new Date());

	await pool.query(
		'INSERT INTO messages (title, date, text, username) VALUES ($1, $2, $3, $4)',
		[title, date, text, username]
	);
};

const changeMembership = async (username) => {
	await pool.query(
		'UPDATE users SET membership = ($1) WHERE username = ($2)',
		['member', username]
	);
};

module.exports = {
	getUser,
	getUserById,
	insertUser,
	getMessages,
	insertMessage,
	changeMembership,
};

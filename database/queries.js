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
	const { rows } = await pool.query('SELECT * FROM messages');
	return rows;
};

const insertMessage = async (title, text, username) => {
	await pool.query(
		'INSERT INTO messages (title, date, text, username) VALUES ($1, $2, $3, $4)',
		[title, new Date(), text, username]
	);
};

const changeMembership = async (username, membership) => {
	await pool.query(
		'UPDATE users SET membership = ($1) WHERE username = ($2)',
		[membership, username]
	);
};

const deleteMessage = async (messageId) => {
	await pool.query('DELETE FROM messages WHERE id = ($1)', [messageId]);
};

module.exports = {
	getUser,
	getUserById,
	insertUser,
	getMessages,
	insertMessage,
	changeMembership,
	deleteMessage,
};

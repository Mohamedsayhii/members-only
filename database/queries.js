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

module.exports = { getUser, getUserById, insertUser };

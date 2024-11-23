const pool = require('./pool');

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

module.exports = { insertUser };

const { Pool } = require('pg');

exports.pool = new Pool({
	connectionString: process.env.DB_STRING,
});

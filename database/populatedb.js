const { Client } = require('pg');

const sqlQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        firstname VARCHAR (255),
        lastname VARCHAR (255),
        username VARCHAR (255) UNIQUE,
        password VARCHAR (255),
        membership VARCHAR (255)
    );

    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title VARCHAR (255),
        date TIMESTAMP,
        text VARCHAR (255),
        username VARCHAR (255),
        CONSTRAINT FK_messages_users FOREIGN KEY(username) REFERENCES users(username)
    );
`;

async function populatedb() {
	console.log('seeding...');
	const client = new Client({
		connectionString: process.env.DB_PUBLIC_URL,
	});
	await client.connect();
	await client.query(sqlQuery);
	await client.end();
	console.log('done');
}

populatedb();

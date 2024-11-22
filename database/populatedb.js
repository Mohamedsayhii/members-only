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

    INSERT INTO users (firstname, lastname, username, password, membership)
    VALUES
        ('admin', 'admin', 'admin', 'admin', 'admin'),
        ('mohamed', 'sayhi', 'moha98', 'moha98', 'member'),
        ('molka', 'sayhi', 'molka04', 'molka04', 'member'),
        ('lamis', 'sayhi', 'lamis04', 'lamis04', 'member'),
        ('lina', 'sayhi', 'lina93', 'lina93', 'guest'),
        ('latifa', 'sayhi', 'latifa66', 'latifa66', 'guest');

    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title VARCHAR (255),
        date TIMESTAMP,
        text VARCHAR (255),
        username VARCHAR (255),
        CONSTRAINT FK_messages_users FOREIGN KEY(username) REFERENCES users(username)
    );

    INSERT INTO messages (title, date, text, username)
    VALUES
        ('Good Morning', '2024-11-22 11:15:00', 'Just had breakfast, it was good tbh', 'moha98'),
        ('Fact', '2024-10-20 01:00:00', 'Lamis is crazy yo', 'molka04'),
        ('Double Fact', '2024-10-21 16:30:00', 'Dont listen to what Molka says', 'lamis04');
`;

async function populatedb() {
	console.log('seeding...');
	const client = new Client({
		connectionString:
			'postgres://mohamedsayhi:123456789@localhost:5432/membersonly',
	});
	await client.connect();
	await client.query(sqlQuery);
	await client.end();
	console.log('done');
}

populatedb();

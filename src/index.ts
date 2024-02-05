import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import * as mysql from 'mysql2/promise';

const connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'security',
	password: 'security',
	database: 'security',
	multipleStatements: true,
});

const app = new Hono();

// Route vulnérable à l'injection SQL
app.post('/login', async (c) => {
	const { username, password }: { username: string; password: string } = await c.req.json();
	// Mauvaise pratique : construction directe de la requête SQL avec des entrées utilisateur non validées
	const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

	// Exécution de la requête SQL vulnérable
	const [user] = await (await connection).query(sql);

	return c.json(user);
});

// Route vulnérable au XSS
app.get('/welcome', async (c) => {
	const name = c.req.query('name'); // Entrée utilisateur non échappée
	// Mauvaise pratique : insertion directe de l'entrée utilisateur dans la réponse HTML
	return c.html(`<h1>Welcome, ${name}!</h1>`);
});

// Route sans protection CSRF pour une action sensible
app.post('/update-profile', async (c) => {
	const { userId, email } = await c.req.json();
	// Mauvaise pratique : aucune vérification de token CSRF ou de l'origine de la requête
	const sql = `UPDATE from users SET email = '${email}' WHERE id = '${userId}'`;

	// Exécution de la requête SQL vulnérable
	await (await connection).query(sql);

	return c.text('Profile updated successfully');
});

// Route avec validation de données insuffisante
app.post('/register', async (c) => {
	const { email, password, username }: { email: string; password: string; username: string } =
		await c.req.json();
	// Mauvaise pratique : validation insuffisante des entrées utilisateur
	if (email && password && username) {
		// Devrait inclure des vérifications de format plus strictes
		const sql = `INSERT INTO users (email, password, username) VALUES ('${email}', '${password}', '${username}')`;
		await (await connection).query(sql);

		return c.text('User registered successfully');
	} else {
		return c.text('Invalid input', 400);
	}
});

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
	fetch: app.fetch,
	port,
});

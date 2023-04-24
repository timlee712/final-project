import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

// creating a new user
app.post('/api/users', async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const query = 'INSERT INTO "Users" (username, password) VALUES ($1, $2)';
    await db.query(query, [username, password]);
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    next(error);
  }
});

// login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await db.query('SELECT * FROM "Users" WHERE username = $1 AND password = $2', [username, password]);
    if (result.rows.length === 0) {
      res.status(401).send('Invalid username or password');
      return;
    }
    res.status(200).send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

// app.post('/api/watchlist/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     // Fetch the movie details from the API
//     const response = await fetch(`https://imdb-api.com/en/API/Title/k_qou5dflv/${id}`);
//     if (!response.ok) {
//       throw new Error('Error fetching movie details');
//     }
//     const data = await response.json();
//     // Store the movie in the database
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

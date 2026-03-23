const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

app.get('/health', async (req, res) => {
    try {
        const result = await pool.query('SELECT 1');
        res.json({ status: 'ok', db: 'connected' });
    } catch (err) {
        res.json({ status: 'error', error: err.message });
    }
});

app.get('/data', async (req, res) => {
    const result = await pool.query('SELECT * FROM app_data');
    res.json(result.rows);
});

app.post('/data', express.json(), async (req, res) => {
    const { content } = req.body;
    const result = await pool.query(
        'INSERT INTO app_data (content) VALUES ($1) RETURNING *',
        [content]
    );
    res.json(result.rows[0]);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

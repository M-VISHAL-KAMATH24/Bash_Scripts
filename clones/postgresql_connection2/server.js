const express = require('express');
require('dotenv').config();

const { connectDB } = require('./config/db');

const app = express();

// middleware
app.use(express.json());

// connect to PostgreSQL
connectDB();

// test route
app.get('/', (req, res) => {
  res.send('Server running 🚀');
});

// sample DB route
app.get('/users', async (req, res) => {
  try {
    const result = await require('./config/db').pool.query(
      'SELECT NOW()'
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// middleware
app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.send('Server is running 🚀');
});

// connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('MongoDB connected successfully ✅');
  })
  .catch((err) => {
    console.error('MongoDB connection error ❌', err);
  });

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

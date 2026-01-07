const express = require('express');
const cors = require('cors');
const logger = require('./logger');  // ← Now exists!

const app = express();
app.use(cors());
app.use(express.json());

// AUTO-LOGGING ENDPOINTS
app.get('/users', (req, res) => {
  logger.info('Fetching users', { count: 42 });
  res.json({ users: ['Alice', 'Bob'], count: 42 });
});

app.post('/login', (req, res) => {
  const { username } = req.body;
  logger.info('Login attempt', { username, success: true });
  res.json({ success: true, token: 'abc123' });
});

app.post('/payment', (req, res) => {
  const { amount, userId, card } = req.body;
  if (!card || card.length < 16) {
    logger.error('Payment failed', { 
      error: 'Invalid card', amount: amount || 0, userId: userId || 'unknown' 
    });
    return res.status(400).json({ error: 'Payment failed' });
  }
  logger.info('Payment success', { amount, userId });
  res.json({ success: true });
});

// Health check endpoint
app.get('/health', (req, res) => {
  logger.info('Health check passed', { 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
  res.status(200).json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: Math.round(process.uptime())
  });
});


app.listen(3000, () => logger.info('🚀 App started'));

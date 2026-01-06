const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const client = new Client({ 
  node: process.env.ELASTIC_URL || 'http://elasticsearch:9200'
});

// POST /log
app.post('/log', async (req, res) => {
  try {
    const { message, level = 'info', endpoint = '/' } = req.body;
    const logDoc = {
      '@timestamp': new Date().toISOString(),
      message, level, endpoint, host: 'docker-app'
    };
    
    const result = await client.index({ index: 'app-logs', document: logDoc });
    console.log('✅ Log saved:', logDoc.message);
    
    res.json({ success: true, id: result._id });
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET /logs (recent 10)
app.get('/logs', async (req, res) => {
  try {
    const { body } = await client.search({
      index: 'app-logs',
      size: 10,
      sort: [{ '@timestamp': 'desc' }]
    });
    res.json(body.hits.hits.map(hit => hit._source));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('🚀 App on http://localhost:3000'));

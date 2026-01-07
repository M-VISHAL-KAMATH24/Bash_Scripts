const winston = require('winston');
const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({
  node: process.env.ELASTIC_URL || 'http://elasticsearch:9200'
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

// ES logging function (async, reliable)
logger.logToES = async (level, message, meta = {}) => {
  try {
    const logEntry = {
      '@timestamp': new Date().toISOString(),
      level,
      message,
      ...meta
    };
    await esClient.index({
      index: 'app-logs',
      body: logEntry
    });
  } catch (error) {
    console.error('ES log failed:', error.message);
  }
};

// Override standard methods
['error', 'warn', 'info', 'debug'].forEach(level => {
  const original = logger[level].bind(logger);
  logger[level] = (...args) => {
    original(...args);
    if (level !== 'debug') logger.logToES(level, args[0], args[1] || {});
  };
});

module.exports = logger;

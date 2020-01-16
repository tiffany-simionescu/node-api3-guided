const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const agent = require('./middleware/agent');
// const morgan = require('morgan');
const logger = require('./middleware/logger');
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// Middleware - 
// express.json()  
// morgan - logger middleware
// helmet - sets response headers for security
// custom middleware - hubsRouter
server.use(helmet());

// server.use(morgan('short'));  - replacing with custom middleware
// server.use(logger);

// HIGHER ORDER FUNCTION
server.use(logger('short'));
server.use(agent('postman'));

server.use(express.json());
server.use('/api/hubs', hubsRouter);

// Return JSON object - Page Not Found
// If no routes match request, this will be the default
server.use((req, res) => {
  res.status(404).json({
    message: "Route was not found"
  })
})

// Insert new middleware for error handling
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "An internal error occurred, please try again later."
  })
})

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

module.exports = server;

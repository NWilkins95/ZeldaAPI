// Import necessary modules and initialize the Express application
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongodb = require('./db/connect');
const port = process.env.PORT || 3000;
const { startServer } = require('./utilities/index');
const { errorHandler } = require('./middleware/error');
const { handleErrors } = require('./middleware/error');
const app = express();
const static = require("./routes/static");

// Middleware to parse JSON bodies
app.use(express.json());

// CORS middleware to allow cross-origin requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Set EJS as the templating engine and use express-ejs-layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

// Serve static files from the 'public' directory
app.use(handleErrors(static));

// Use routes defined in the routes directory
app.use('/', require('./routes'));

app.use(errorHandler);

// Global error handling for uncaught exceptions
process.on('uncaughtException', (err, origin) => {
  console.error(`Caught exception: ${err}\nException origin: ${origin}`);
});

// Initialize the database connection and start the server
startServer(app, port);
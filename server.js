// Import necessary modules and initialize the Express application
require('dotenv').config();
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const mongodb = require('./db/connect');
const { startServer } = require('./utilities/index');
const { errorHandler } = require('./middleware/error');
const { handleErrors } = require('./middleware/error');
const static = require("./routes/static");
const port = process.env.PORT || 3000;

// Create Express app
const app = express();

// Configure session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

// Initialize Passport and restore authentication state, if any
app.use(passport.initialize());
app.use(passport.session());

// Serialize and deserialize user instances to and from the session
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

// Configure the GitHub strategy for use by Passport
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }
));

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

// Error handling middleware
app.use(errorHandler);

// Global error handling for uncaught exceptions
process.on('uncaughtException', (err, origin) => {
  console.error(`Caught exception: ${err}\nException origin: ${origin}`);
});

// Initialize the database connection and start the server
startServer(app, port);
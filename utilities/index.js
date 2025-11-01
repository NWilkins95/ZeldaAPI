const { connectToDb } = require('../db/connect');

// Function to start the server after connecting to the database
async function startServer(app, port) {
  try {
    await connectToDb();
    app.listen(port, () => {
      console.log(`Connected to database and server listening on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // Kill the server if DB connection fails
  }
}

// Function to check if the user is authenticated, this will be a placeholder and refactored later with OAuth logic
function checkLogin(req, res, next) {
  var isAuthenticated = false; // Placeholder for actual authentication logic

  if (isAuthenticated) {
    next();
  } else {
    res.status(401).send("Unauthorized");
    res.redirect('/'); // Redirect to home page if not authenticated
  }
}

module.exports = { startServer, checkLogin };
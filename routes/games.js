const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const { handleErrors } = require('../middleware/error');
const gamesController = require('../controllers/gamesController');
const { checkLogin } = require('../utilities');

// Apply authentication check middleware to all routes in this router
router.use(checkLogin);

// Route to get all games
router.get('/', validation.validateGetAll, handleErrors(gamesController.getAll));

// Route to get a single game by ID
router.get('/:id', validation.validateGetByID, handleErrors(gamesController.getSingle));

// Route to create a new game
router.post('/', validation.saveGame, handleErrors(gamesController.createNewGame));

// Route to update an existing game by ID
router.put('/:id', validation.validateGetByID, validation.saveGame, handleErrors(gamesController.updateGame));

// Route to delete a game by ID
router.delete('/:id', validation.validateGetByID, handleErrors(gamesController.deleteGame));

module.exports = router;
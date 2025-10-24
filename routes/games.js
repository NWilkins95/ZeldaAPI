const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const { handleErrors } = require('../middleware/error');
const gamesController = require('../controllers/gamesController');

// Route to get all games
router.get('/', handleErrors(gamesController.getAll));

// Route to get a single game by ID
router.get('/:id', handleErrors(gamesController.getSingle));

// Route to create a new game
router.post('/', validation.saveGame, handleErrors(gamesController.createNewGame));

// Route to update an existing game by ID
router.put('/:id', validation.saveGame, handleErrors(gamesController.updateGame));

// Route to delete a game by ID
router.delete('/:id', handleErrors(gamesController.deleteGame));

module.exports = router;
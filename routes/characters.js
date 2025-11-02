const express = require('express');
const router = express.Router();
const validation = require('../middleware/validate');
const { handleErrors } = require('../middleware/error');
const charactersController = require('../controllers/charactersController');
const { checkLogin } = require('../utilities');

// Apply authentication check middleware to all routes in this router
router.use(checkLogin);

// Route to get all characters
router.get('/', validation.validateGetAll, handleErrors(charactersController.getAll));

// Route to get a single character by ID
router.get('/:id', validation.validateGetByID, handleErrors(charactersController.getSingle));

// Route to create a new character
router.post('/', validation.saveCharacter, handleErrors(charactersController.createNewCharacter));

// Route to update an existing character by ID
router.put('/:id', validation.validateGetByID, validation.saveCharacter, handleErrors(charactersController.updateCharacter));

// Route to delete a character by ID
router.delete('/:id', validation.validateGetByID, handleErrors(charactersController.deleteCharacter));

module.exports = router;
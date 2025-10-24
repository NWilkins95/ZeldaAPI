const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const gamesController = {};

gamesController.getAll = async (req, res) => {
  try {
    const games = await mongodb.getDb().collection('games').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(games);
  } catch (err) {
    console.error("Error fetching games:", err);
    res.status(500).json({ error: "Failed to fetch games" });
  }
};

gamesController.getSingle = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);
    const game = await mongodb.getDb().collection('games').findOne({ _id: gameId });
    if (game) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(game);
    } else {
      res.status(404).json({ error: "Game not found" });
    }
  } catch (err) {
    console.error("Error fetching game:", err);
    res.status(500).json({ error: "Failed to fetch game" });
  }
};

gamesController.createNewGame = async (req, res) => {
  try {
    const newGame = {
      title: req.body.title,
      launchDate: req.body.launchDate,
      rating: req.body.rating,
      publisher: req.body.publisher,
      platform: req.body.platform,
      timeline: req.body.timeline,
      sequels: req.body.sequels,
      description: req.body.description
    };

    // make sure all fields are provided
    if (!newGame.title || !newGame.launchDate || !newGame.rating || !newGame.publisher || !newGame.platform || !newGame.timeline || !newGame.sequels || !newGame.description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await mongodb.getDb().collection('games').insertOne(newGame);
    res.status(201).json({id: result.insertedId});
  } catch (err) {
    console.error("Error creating game record:", err);
    res.status(500).json({ error: "Failed to create game record" });
  }
};

gamesController.updateGame = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);
    const updatedGame = {
      title: req.body.title,
      launchDate: req.body.launchDate,
      rating: req.body.rating,
      publisher: req.body.publisher,
      platform: req.body.platform,
      timeline: req.body.timeline,
      sequels: req.body.sequels,
      description: req.body.description
    };

    // Make sure all fields are provided
    if (!updatedGame.title || !updatedGame.launchDate || !updatedGame.rating || !updatedGame.publisher || !updatedGame.platform || !updatedGame.timeline || !updatedGame.sequels || !updatedGame.description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await mongodb.getDb().collection('games').updateOne({ _id: gameId }, { $set: updatedGame });
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error("Error updating game record:", err);
    res.status(500).json({ error: "Failed to update game record" });
  }
};

gamesController.deleteGame = async (req, res) => {
  try {
    const gameId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('games').deleteOne({ _id: gameId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.status(200).send();
  } catch (err) {
    console.error("Error deleting game:", err);
    res.status(500).json({ error: "Failed to delete game" });
  }
};

module.exports = gamesController;
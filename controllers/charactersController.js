const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;
const charactersController = {};

charactersController.getAll = async (req, res) => {
  try {
    const characters = await mongodb.getDb().collection('characters').find().toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(characters);
  } catch (err) {
    console.error("Error fetching characters:", err);
    res.status(500).json({ error: "Failed to fetch characters" });
  }
};

charactersController.getSingle = async (req, res) => {
  try {
    const characterId = new ObjectId(req.params.id);
    const character = await mongodb.getDb().collection('characters').findOne({ _id: characterId });
    if (character) {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(character);
    } else {
      res.status(404).json({ error: "Character not found" });
    }
  } catch (err) {
    console.error("Error fetching character:", err);
    res.status(500).json({ error: "Failed to fetch character" });
  }
};

charactersController.createNewCharacter = async (req, res) => {
  try {
    const newCharacter = {
      name: req.body.name,
      race: req.body.race,
      gender: req.body.gender,
      age: req.body.age,
      era: req.body.era,
      description: req.body.description
    };

    // make sure all fields are provided
    if (!newCharacter.name || !newCharacter.race || !newCharacter.gender || !newCharacter.age || !newCharacter.era || !newCharacter.description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await mongodb.getDb().collection('characters').insertOne(newCharacter);
    res.status(201).json({id: result.insertedId});
  } catch (err) {
    console.error("Error creating character:", err);
    res.status(500).json({ error: "Failed to create character" });
  }
};

charactersController.updateCharacter = async (req, res) => {
  try {
    const characterId = new ObjectId(req.params.id);
    const updatedCharacter = {
      name: req.body.name,
      race: req.body.race,
      gender: req.body.gender,
      age: req.body.age,
      era: req.body.era,
      description: req.body.description
    };

    // Make sure all fields are provided
    if (!updatedCharacter.name || !updatedCharacter.race || !updatedCharacter.gender || !updatedCharacter.age || !updatedCharacter.era || !updatedCharacter.description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const result = await mongodb.getDb().collection('characters').updateOne({ _id: characterId }, { $set: updatedCharacter });
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Character not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error("Error updating character:", err);
    res.status(500).json({ error: "Failed to update character" });
  }
};

charactersController.deleteCharacter = async (req, res) => {
  try {
    const characterId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('characters').deleteOne({ _id: characterId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Character not found" });
    }
    res.status(200).send();
  } catch (err) {
    console.error("Error deleting character:", err);
    res.status(500).json({ error: "Failed to delete character" });
  }
};

module.exports = charactersController;
const validator = require('../utilities/validate');
const { ObjectId } = require('mongodb');

const saveCharacter = (req, res, next) => {
  const rules = {
    name: 'required|string',
    race: 'required|string',
    gender: 'required|string',
    age: 'required|integer|min:0',
    era: 'required|string',
    description: 'required|string'
  };
  validator(req.body, rules, {}, (errors, isValid) => {
    if (isValid) {
      next();
    } else {
      const err = new Error('Validation failed');
      err.statusCode = 422;
      err.details = errors;
      next(err); // Pass the error to the next middleware, which is the error handler
    }
  });
};

const saveGame = (req, res, next) => {
  const rules = {
    title: 'required|string',
    launchDate: 'required|string',
    rating: 'required|string',
    publisher: 'required|string',
    platform: 'required|string',
    timeline: 'required|string',
    sequels: 'required|string',
    description: 'required|string'
  };
  validator(req.body, rules, {}, (errors, isValid) => {
    if (isValid) {
      next();
    } else {
      const err = new Error('Validation failed');
      err.statusCode = 422;
      err.details = errors;
      next(err); // Pass the error to the next middleware, which is the error handler
    }
  });
};
 
const validateGetByID = (req, res, next) => {
  const id = req.params.id;

  if (ObjectId.isValid(id) && (String)(new ObjectId(id)) === id) {
    next();
  } else {
    const err = new Error('Invalid MongoDB ObjectId');
    err.statusCode = 422;
    err.details = { id: 'Must be a valid MongoDB ObjectId' };
    next(err);
  }
};

const validateGetAll = (req, res, next) => {
  const rules = {
    page: 'integer|min:1',
    limit: 'integer|min:1|max:100',
    sort: 'in:asc,desc'
  };

  validator(req.query, rules, {}, (errors, isValid) => {
    if (isValid) {
      next();
    } else {
      const err = new Error('Validation failed');
      err.statusCode = 422;
      err.details = errors;
      next(err); // Pass the error to the error-handling middleware
    }
  });
};

module.exports = { saveCharacter, saveGame, validateGetByID, validateGetAll };
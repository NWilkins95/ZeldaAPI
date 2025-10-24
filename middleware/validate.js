const validator = require('../utilities/validate');

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

module.exports = { saveCharacter, saveGame };
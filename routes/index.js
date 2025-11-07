const routes = require('express').Router();

routes.use('/', require('./swagger'));
routes.use('/characters', require('./characters'));
routes.use('/games', require('./games'));
routes.use('/auth', require('./auth'));

module.exports = routes;
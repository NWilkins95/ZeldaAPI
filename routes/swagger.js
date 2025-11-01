const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const validation = require('../middleware/validate');
const { handleErrors } = require('../middleware/error');
const { checkLogin } = require('../utilities');

router.get('/login', (req, res) => {
  res.send('Login Page - Placeholder');
});

// Apply authentication check middleware to all routes in this router for swagger
router.use(checkLogin);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', validation.validateGetAll, handleErrors(swaggerUi.setup(swaggerDocument)));

module.exports = router;
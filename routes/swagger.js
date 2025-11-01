const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const validation = require('../middleware/validate');
const { handleErrors } = require('../middleware/error');
const { checkLogin } = require('../utilities');

// Apply authentication check middleware to all routes in this router
router.use(checkLogin);

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', validation.validateGetAll, handleErrors(swaggerUi.setup(swaggerDocument)));

module.exports = router;
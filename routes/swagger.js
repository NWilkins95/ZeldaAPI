const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const validation = require('../middleware/validate');
const { handleErrors } = require('../middleware/error');


router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', validation.validateGetAll, handleErrors(swaggerUi.setup(swaggerDocument)));

module.exports = router;
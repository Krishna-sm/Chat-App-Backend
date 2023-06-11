const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../../docs/swaggerDef');
const { SwaggerTheme } = require('swagger-themes');
const theme = new SwaggerTheme('v3');
const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['docs/*.yml', 'routes/v1/*.js'],
});

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(specs, {
    explorer: true,
    customCss: theme.getBuffer('feeling-blue'),
    customSiteTitle:"Chat App"
  })
);

module.exports = router;

const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerDefinition = {
  openapi: '3.1.0',
  info: {
    title: 'ThorCommerce API Documentation',
    version: '1.0.0',
    description: 'API documentation for ThorCommerce Application',
  },
};

const options = {
  swaggerDefinition,
  apis: [path.resolve(__dirname, '../routes/*.js')], // Adjust the path to match your directory structure
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Vehicles Microservice API',
      version: '1.0.0',
      description: 'Vehicle Microservice API Documentation',
    },
  },
  apis: [
    path.join(__dirname, './interface_adapters/routes/*.js')
  ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpec;



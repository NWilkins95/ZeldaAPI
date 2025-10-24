require('dotenv').config();

const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: "Zelda API",
    description: 'A simple API to get information about characters and games in the Zelda series.',
  },
  host: process.env.RENDER_EXTERNAL_URL,
  schemes: ['https']
};

const outputFile = './swagger.json';
const routes = ['./routes/index.js'];

swaggerAutogen(outputFile, routes, doc);


const swaggerDef = {
  openapi: '3.0.0',
  info: {
    title: 'logistic 🔥',
    version:"1.0.0",
    
    license: {
      name: 'MIT',
      url: 'https://github.com/hagopj13/node-express-boilerplate/blob/master/LICENSE',
    },
  },
  servers: [
   
    { 
      url: `http://localhost:${process.env.port}/logistic-app-service/v1`,
    },
  ],
};

module.exports = swaggerDef;

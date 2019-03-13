import swaggerJSDoc from 'swagger-jsdoc';
import config from '../index';


// var schema = [ 'https','http' ];

var schema = [ 'http' ];

export default (app) => {
  // Initialize Swagger
  let options = {
    swaggerDefinition: {
      swagger: "2.0",
      info: config.swagger.info,
      basePath: `/`,
      schemes: schema,
      securityDefinitions: {
        AuthChecks: {
          type: 'apiKey',
          name: 'x-access-token',
          in: 'header',
          description: 'The following syntax must be used in the "Authorization" header xxxxxx.yyyyyyy.zzzzzz'
        },
        Context: {
          type: 'apiKey',
          name: 'x-access-token',
          in: 'header',
          description: 'The following syntax must be used in the "Authorization" header xxxxxx.yyyyyyy.zzzzzz'
        }
      }
    },
    consumes: ['application/json'],
    produces: ['application/json'],
    apis: [
      `${config.base}/aaa/authentication/**/*.yaml`,
      `${config.base}/api/**/*.yaml`
    ]
  };
  return swaggerJSDoc(options);

};

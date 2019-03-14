import swaggerJSDoc from 'swagger-jsdoc'
import config from '../index'


// var schema = [ 'https','http' ];

var schema = [ 'http' ]

export default (app) => {
	// Initialize Swagger
	let options = {
		swaggerDefinition: {
			swagger: '2.0',
			info: config.swagger.info,
			basePath: '/',
			schemes: schema,
			securityDefinitions: {
				AuthChecks: {
					type: 'apiKey',
					name: 'x-access-token',
					in: 'header',
					description: 'Used to check user is logged-in or not.'
				},
				Context: {
					type: 'apiKey',
					name: 'x-access-token',
					in: 'header',
					description: 'This is used to attach the logged-in user context with the request.'
				}
			}
		},
		consumes: ['application/json'],
		produces: ['application/json'],
		apis: [
			`${config.base}/aaa/authentication/**/*.yaml`,
			`${config.base}/api/**/*.yaml`
		]
	}
	return swaggerJSDoc(options)

}

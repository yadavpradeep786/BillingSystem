import swaggerTools from 'swagger-tools'
import express from 'express'
import contextHandler from '../../aaa/authorization/contextHandler'
import config from '../index'

export function index(app) {
	let swaggerConfig = require('./config').default(app)
	let routerConfig = {
		controllers: [
			`${config.base}/aaa/authentication`,
			`${config.base}/api/users`,
			`${config.base}/api/roles`,
			`${config.base}/api/products`,
			`${config.base}/api/billing`,
		],
		useStubs: false // If you want use examples.
	}
	swaggerTools.initializeMiddleware(swaggerConfig, middleware => {
		// Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
		app.use(middleware.swaggerMetadata())
        
		// Provide the security handlers
		app.use(middleware.swaggerSecurity({
			Context: ((req, authOrSecDef, token, cb) => {
				contextHandler.getUserContext(req, authOrSecDef, token, cb)
			})
		}))

		// Validate Swagger requests
		app.use(middleware.swaggerValidator({ validateResponse: false }))

		// Route validated requests to appropriate controller need to open
		app.use(middleware.swaggerRouter(routerConfig))

		app.use(errorHandler)

		router(app, swaggerConfig)
	})
}

function router(app, swaggerConfig) {
	// If Swagger is enabled then the router is enabled!
	if (config.swagger.enabled) {
		app.get('/swagger.json', (req, res) => res.json(swaggerConfig))
		app.use('/docs', express.static(`${config.base}/config/swaggerConfig/ui`))
	}
}

function errorHandler(err, req, res, next) {
	if (err) {
		// console.log('swagger err ->', err)
		var error = {
			status: false,
			result: err
		}
		res.status(500).send(error)
	}
}
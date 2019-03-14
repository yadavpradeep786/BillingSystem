import path from 'path'
require('dotenv').config()


const APP_NAME = process.env.APP_NAME || 'GPP'
const DB_NAME = process.env.DB_NAME || 'peoplecare'

export default {
	secret: 'yadav_secret', // Secret Key
	server: { // Express
		ip: process.env.SERVER_IP || 'localhost',
		port: process.env.SERVER_PORT || 8000,
	},
	port: 8000,
	log: true,
	dbConfig: {
		uri: `${process.env.MONGO_URL}/${DB_NAME}` || `mongodb://localhost:27017/${DB_NAME}`,
		options: {
			useMongoClient: true,
			socketTimeoutMS: 0,
			keepAlive: true,
			reconnectTries: 30
		}
	},

	swagger: {
		enabled: true, // router -> http://localhost:8000/docs/,
		info: {
			version: 'v1.0',
			title: APP_NAME,
			description: `RESTful API ${APP_NAME}`,
			contact: {
				name: 'Pradeep Yadav',
				url: '',
				email: 'yadavpradeep786@gmail.com'
			}
		}
	},
	authConfig: {
		local: true,
		facebook: false,
		google: false
	},
	mode: process.env.NODE_ENV || 'development', // mode
	name: APP_NAME, // name 
	node: parseInt(process.env.NODE_APP_INSTANCE) || 0, // node instance
	root: path.normalize(`${__dirname}/../..`), // root
	base: path.normalize(`${__dirname}/..`), // base
}
import express from 'express';
import config from './config/index';
import insertSeedData from './config/seedData/seeds';
import mongoConfig from './commons/dbController/index';
import DBController from './commons/dbController/dbController';

const app = express();

(async function () {
    // Express Configuration
    require('./config/expressConfig').expressConfig(app);

    // Mongo Configuration
    await mongoConfig.connect(config.dbConfig.uri);

    // db controller instance 
    global.dbController = new DBController();

    // Insert default seeds
    insertSeedData();

    // Swagger
    require('./config/swaggerConfig/index').index(app);

    // Server 
    app.listen(config.server.port, config.server.ip, () => {
        console.log('Server running on port ', config.server.port);
    });

    app.get('/', (req, res) => {
        res.send("Welcome, Techies !");
    });
    
})();

module.exports = app;
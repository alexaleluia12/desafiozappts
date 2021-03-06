const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('./controllers');


function appBuilder(){

    const app = express();

    app.use(bodyParser.json());

    app.get('/letter', controllers.read);

    app.get('/letter/:letterId', controllers.read);

    app.delete('/letter/:letterId', controllers.deleteController);

    app.post('/letter', controllers.create);

    app.patch('/letter', controllers.update);

    return app;
}

module.exports = appBuilder;
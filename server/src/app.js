const express = require('express'),
    bodyParser = require('body-parser'),
    routeHandler = require('./routers/router'),
    mongoose = require('mongoose');

const app = express();
const middlewares = require('./middlewares');

app.use(bodyParser.urlencoded({ extended: true })); // for admin website
app.use(bodyParser.json()); // API Request
app.use(express.static(__dirname + './public'));

//Database Connecting ./..
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const url = `mongodb://${dbHost}:${dbPort}/dummy_data`;
console.log('Connecting to database "url"...');
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the mongodb instance. Error: ', err);
    });


//API's
app.use('/', routeHandler);
//Middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
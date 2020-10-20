const express = require('express'),
    bodyParser = require('body-parser'),
    routeHandler = require('./routers/router'),
    mongoose = require('mongoose');

require('dotenv').config({ path: '../../.env' });

const app = express();
const middlewares = require('./middlewares');

app.use(bodyParser.urlencoded({ extended: true })); // for admin website
app.use(bodyParser.json()); // API Request
app.use(express.static(__dirname + './public'));

app.get('/', (req, res) => {
    res.json({
        message: "LOL"
    })
});

//Database Connecting ./..
const url = `mongodb://localhost:27017/dummyData`;
console.log('Connecting to database...');
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database successfully.');
    })
    .catch((err) => {
        console.log('Unable to connect to the mongodb instance. Error: ', err);
    });


//API's
app.use('/api/v1', routeHandler);
//Middlewares
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
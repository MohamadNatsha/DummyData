const express = require('express');
const bodyParser = require('body-parser');
const routeHandler = require('./src/routes/main');
const mongoose = require('mongoose');

require('dotenv').config({ path: '.env' });

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // for admin website
app.use(bodyParser.json()); // API Request
app.use(express.static(__dirname + '/src/public'));
app.use('/', routeHandler);

const url = `mongodb://localhost:27017/dummyData`;
console.log('Connecting to database...');

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database successfully.');
  })
  .catch((err) => {
    console.log('Unable to connect to the mongodb instance. Error: ', err);
});

// Start The Server
const http = require('http');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);

console.log('Listening on 3000...');
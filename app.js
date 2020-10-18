const express = require('express');
const bodyParser = require('body-parser');
const routeHandler = require('./src/routes/main');

require('dotenv').config({ path: '.env' });

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); // for admin website
app.use(bodyParser.json()); // API Request
app.use(express.static(__dirname + '/src/public'));
app.use('/', routeHandler);

// Start The Server
const http = require('http');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);

console.log('Listening on 3000...');
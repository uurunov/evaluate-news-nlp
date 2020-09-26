const dotenv = require('dotenv');
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
const projectData = {};

var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
/* Middleware*/
const bodyParser = require('body-parser');
// Cors for cross origin allowance
const cors = require('cors');

const app = express();
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
	res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
	console.log('Example app listening on port 8081!');
	console.log(dotenv.config());
})

app.get('/test', function (req, res) {
	res.send(dotenv.config());
})

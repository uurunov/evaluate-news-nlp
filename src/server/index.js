const dotenv = require('dotenv');
const Key = dotenv.config();
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?key=';
const API = Key.parsed.API_KEY;

// Setup empty JS object to act as endpoint for all routes
const projectData = {};

const fetch = require("node-fetch");
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
	console.log(Key);
})

/* Function to GET Web API Data*/
const getDataAPI = async function (baseURL, api, input) {
	const apiData = await fetch(baseURL+api+input);
	try {
		const response = await apiData.json();
		console.log('API data is received from MeaningCloud');
		return response;
	}
	catch(error) {
		console.log("Error has occurred:");
		console.log(error);
	}
}

app.get('/api/test', function (req, res) {
	const input = `&of=json&txt=${projectData.name}&lang=en`;
	getDataAPI(baseURL, API, input).then(function(data) {
		console.log(data);
		res.send(data);
	});
})

app.post('/api/add', function (req, res) {
	console.log(req.body);
	projectData.name = req.body.name;
	console.log(projectData.name);
})

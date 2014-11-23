var http = require('http');
var https = require('https');
var fs = require('fs');
var utils = require('./utils.js');

var getPlayerOptionsRequest = {
	'getPlayerOptionsRequest': {
		'ResourceId': '5acf0cf7333441b4b518bb3125253a131d',
		'QueryString': '',
		'UseScreenReader': false,
		'UrlReferrer': ''
	}
};

var getPlayerOptionsRequestString = JSON.stringify(getPlayerOptionsRequest);

var headers = {
	'Content-Type': 'application/json',
	'Content-Length': getPlayerOptionsRequestString.length
};

var options = {
	host: 'collegerama.tudelft.nl',
	port: 80,
	path: '/Mediasite/PlayerService/PlayerService.svc/json/GetPlayerOptions',
	method: 'POST',
	headers: headers
};

var req = http.request(options, function(res) {
	// Save data file
	var file = fs.createWriteStream('data/data.json');
	res.pipe(file);

	// On finishing, download slides
	res.on('end', function () {
		fs.readFile('data/data.json', function (err, data) {
			if (err) {
				throw err;
			} else {
				slides(data);
			}
		});
	});
});

var slides = function(data) {
	var resultObject = JSON.parse(data);
	
	var stream = resultObject.d.Presentation.Streams[0];
	var slideBaseURL = stream.SlideBaseUrl;
	var slideImageFileNameTemplate = stream.SlideImageFileNameTemplate;
	
	stream.Slides.forEach(function (slide) {
		var padded = utils.pad(slide.Number.toString(), 4);
		var fileName = slideImageFileNameTemplate.replace('{0:D4}', padded);

		var file = fs.createWriteStream('slides/' + fileName);
		var request = https.get(slideBaseURL + fileName, function (res) {
		  res.pipe(file);
		});
	});
};

req.write(getPlayerOptionsRequestString);
req.end();
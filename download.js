var http = require('http');
var https = require('https');
var fs = require('graceful-fs');
var utils = require('./utils.js');

if (undefined === process.argv[2]) {
	console.log('Please provide a resourceId as argument (e.g. 5acf0cf7333441b4b518bb3125253a131d)');
	process.exit(1);
}

var resourceId = process.argv[2];
var basePath = 'lectures/'+resourceId;

var getPlayerOptionsRequest = {
	'getPlayerOptionsRequest': {
		'ResourceId': resourceId,
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
	var file = fs.createWriteStream(basePath + '/data/data.json');
	res.pipe(file);

	// On finishing, download slides
	res.on('end', function () {
		fs.readFile(basePath + '/data/data.json', function (err, data) {
			if (err) {
				throw err;
			} else {
				var resultObject = JSON.parse(data);

				slides(resultObject);
				video(resultObject);
			}
		});
	});
});

var slides = function (data) {
	var stream = data.d.Presentation.Streams[0];
	var slideBaseURL = stream.SlideBaseUrl;
	var slideImageFileNameTemplate = stream.SlideImageFileNameTemplate;
	
	stream.Slides.forEach(function (slide) {
		var padded = utils.pad(slide.Number.toString(), 4);
		var fileName = slideImageFileNameTemplate.replace('{0:D4}', padded);

		var file = fs.createWriteStream(basePath + '/slides/' + fileName);
		var request = https.get(slideBaseURL + fileName, function (res) {
		  res.pipe(file);
		});
	});
};

var video = function (data) {
	var stream = data.d.Presentation.Streams[1];
	var file = fs.createWriteStream(basePath + '/video.mp4');
	var request = https.get(stream.VideoUrls[0].Location, function (res) {
		res.pipe(file);
	});
};

req.write(getPlayerOptionsRequestString);
req.end();
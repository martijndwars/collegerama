

var Q = require('q');
var http = require('http');
var https = require('https');
var fs = require('graceful-fs');
var mkdirp = require('mkdirp');
var utils = require('./utils.js');


console.log("id ", process.argv[2]);

if (undefined === process.argv[2]) {
	console.log('Please provide a resourceId as argument (e.g. 5acf0cf7333441b4b518bb3125253a131d)');
	process.exit(1);
}

var resourceId = process.argv[2];
var rootPath = __dirname.replace('server','') + 'public/lectures/'
var basePath = rootPath + resourceId;

Q.all([mkdirp(basePath + '/data'), mkdirp(basePath + '/slides')]).done(function () {
	console.log('Directory structure setup!');
});

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

var addId = function (rootPath) {
    // Succesfull download, add id to list

    var listFile = rootPath + 'list.json';
                
    fs.readFile(listFile, function (err, data) {
        if (err) {
            console.log(err);
            return false;
        } else {
            var list = JSON.parse(data);

            if (createList(list,listFile)) {
                req.write(getPlayerOptionsRequestString);
                req.end();
            }
        }
    });
}


var createList = function (list,listFile) {

    for (var id in list.lectures) {
        if (list.lectures[id].id == resourceId) {    
            console.log("list.json already contains id",resourceId);
            process.exit(1)
        }
    }

    list.lectures.push({id: resourceId});
    var data = JSON.stringify(list);


    fs.writeFile(listFile, data);
    console.log("written json",data);

    return true;
}

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
        
        res.on('end', function () {
            console.log("done");
            process.exit(0);
        });
	});
};


addId(rootPath);



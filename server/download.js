

var Q = require('q');
var request = require("request");
var http = require('http');
var https = require('https');
var fs = require('graceful-fs');
var mkdirp = require('mkdirp');
var utils = require('./utils.js');


//console.log("id ", process.argv[2]);

if (undefined === process.argv[2]) {
	console.log('Please provide a resourceId as argument (e.g. 5acf0cf7333441b4b518bb3125253a131d)');
	process.exit(1);
}

var resourceId = process.argv[2];
var rootPath = __dirname.replace('server','') + 'public/lectures/'
var basePath = rootPath + resourceId;
var size = 0;
var cur = 0;
var listFile = rootPath + 'list.json';
var tried = false;



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

var createDataDirs = (callback) => {

	fs.mkdir(basePath, () => {
		fs.mkdir(basePath + '/data', () => {
			fs.mkdir(basePath + '/slides', callback)
		})
	})
	
}

var req = http.request(options, function(res) {

	createDataDirs(function () {
		//console.log('Directory structure setup!');

		// Save data file
		var file = fs.createWriteStream(basePath + '/data/data.json');
		res.pipe(file);

		file.on('error', (err) => {
			console.log(err);
			process.exit(1);

		})

		

		// On finishing, download slides
		file.on('finish', function () {
			fs.readFile(file.path, (err, data) => {
				if (err !== null) {
					console.log("data.json error:", err);
					console.log("path: ", file.path);
					process.exit(1);
					
				} else {	
					var resultObject = JSON.parse(data);
					console.log("Starting download",resourceId);

					
					slides(resultObject);
					video(resultObject);
				}

			});
		
		



		});
	});

	
	return;	
});


var testReq = function (rootPath) {

	var testRequest = http.request(options, (Incomming) => {
		//console.log("status",Incomming.statusCode);

		if (Incomming.statusCode === 200) {
			//console.log("Success");
			addId(rootPath, writeCallback);

		} else {
			console.log("Server couldn't find id");
			process.exit(1);
		}
	
	});

	testRequest.write(getPlayerOptionsRequestString);
	testRequest.end();


}



var addId = function (rootPath , callback) {
                
    fs.readFile(listFile, (err, data) => {
        if (err) {
			console.log(err);
			createListJson(rootPath);
            return false;
        } else {
            callback(data);
        }
    });
}

var writeCallback = function (data) {
	var list = JSON.parse(data);

	if (isList(list)) {
		req.write(getPlayerOptionsRequestString);
		req.end();
	}
}

var createListJson = function (rootPath) {

	fs.mkdir(rootPath, () => {

		var listFile = rootPath + 'list.json';
	
		var list = {
			lectures: []
		};
	
		var data = JSON.stringify(list);
	
		fs.writeFile(listFile, data);
		console.log("written json file",data);
		
		addId(rootPath, writeCallback);
	});
}

var isList = function(list) {
	for (var id in list.lectures) {
        if (list.lectures[id].id == resourceId) {    
            console.log("list.json already contains id",resourceId);
            process.exit(1)
        }
	}


	
	return true;
}


var createList = function (callback) {


	addId(rootPath, function (data) {
		var list = JSON.parse(data);

		list.lectures.push({id: resourceId});
		data = JSON.stringify(list);
	
		fs.writeFile(listFile, data, () => {
			callback();
		});

	});

	
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
		
		size = parseInt(res.headers['content-length'], 10);
		cur = 0;
		var total = size / 1048576;

		setInterval(() => {
			console.log("Downloading " + (100.0 * cur / size).toFixed(2) + "% " + (cur / 1048576).toFixed(2) + " MB" + " Total size: " + total.toFixed(2) + " MB");
		},1000);

		res.on("data", function(chunk) {
			cur += chunk.length;
		});
        
        res.on('end', function () {
			console.log("done");
			createList(() => {
				process.exit(0);
			});

        });
	});
};



try {
 	testReq(rootPath);
} catch (err) {
	console.log("error",err);
	process.exit(1);
}



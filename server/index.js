const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
var fs = require('graceful-fs');
const { fork } = require('child_process');
var http = require('http');
var sys = require('sys')
var child_process = require('child_process');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

let out = null;
let lastMessage = null;
let downloadId = null;

app.get('/download.js', (req, res) => {
    const id = req.query.id || null;
    res.setHeader('Content-Type', 'application/json');


    if (id == null) {
        res.status(200).send(JSON.stringify({ message: `No id given` }));
        return;
    }
    


    var filteredData = id.replace(/[^\w\s]/gi, '');

    lastMessage = "Starting download: " + filteredData;


    downloadId = filteredData;

    out = child_process.spawn('node', ['server/download.js', filteredData]);

    out.stdout.on('data', (data) => {
        console.log('stdout: ' + data);
        lastMessage = data.toString("utf8");
    });

    out.stderr.on('data', (data) => {
        console.log('stderr: ' + data);
    });

    out.on('close', (code) => {
        if (code === 1) {
            console.log('stderr: ' + code);
            return;
        }


        console.log('Done Downloading');

        out = null;
    });

   
});

app.get('/isDownload', (req, res) => {
    //console.log("isDownload");

    if (lastMessage !== null) {
        res.status(200).send(JSON.stringify(lastMessage));
        return;
    }

    if (out === null) {
        res.status(200).send(JSON.stringify("Not Downloading"));
        return;
    }


    res.status(200).send(JSON.stringify("Starting download: " + downloadId));


});




var server = http.createServer(app).listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);


var io = require('socket.io')(server);

io.on('connection', function(socket) {

    function sendBack(data) {
        socket.emit('output',data);
    }

    socket.on('input',function (data) {

        

    


    });

    

    socket.on('disconnect', function() {
        console.log("Disconnected");
    });









});


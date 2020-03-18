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

app.get('/download.js', (req, res) => {
    const id = req.query.id || null;
    res.setHeader('Content-Type', 'application/json');

    console.log(id);

    if (id == null) res.send(JSON.stringify({ message: `No id given` }));

    

    res.send(JSON.stringify({ message: `` }));
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
        var filteredData = data.replace(/[^\w\s]/gi, '');

        console.log(filteredData);
    
        sendBack("Downloading: " + filteredData);

        var out = child_process.spawnSync('node', ['server/download.js', filteredData]);
        console.log('status: ' + out.status);
        console.log('stdout: ' + out.stdout.toString('utf8'));
        console.log('stderr: ' + out.stderr.toString('utf8'));
        console.log();

        if (out.stderr != null) {
            console.log("failure");
            sendBack(out.stdout.toString('utf8'));
            return;
        }
    
        sendBack("success");


    });

    

    socket.on('disconnect', function() {
        console.log("Disconnected");
    });









});


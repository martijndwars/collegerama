const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
var fs = require('graceful-fs');
const path = require('path');
const { fork } = require('child_process');
var http = require('http');
var sys = require('sys')
var child_process = require('child_process');
const WebSocket = require('ws');


const app = express();

app.use('/lectures',express.static(path.join(__dirname, '/../../lectures')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);



let lastMessage = null;
let downloadId = null;


app.get('/list.json', (req, res) => {

    const directoryPath = __dirname.replace('collegerama/server','') + 'lectures/'


    try {
        const files = fs.readdirSync(directoryPath);
        const fileList = files.filter(file => file !== ".DS_Store");
        res.status(200).send(JSON.stringify(fileList));
    } catch (err) {
        res.status(404).send('Unable to scan lectures direcetory, did you download any lectures?: ' + err);
    }


})





var server = http.createServer(app);
const io = new WebSocket.Server({server});
var children = [];


function killall() {
    children.forEach(function(child) {
        child.kill();
    });
}

io.on('connection', function(socket) {
    console.log("connection is open");




    socket.on('message',function (data) {
        const downloadId = data;

        killall();

        let out = null;


        out = child_process.spawn('node', ['server/download.js', downloadId]);
        children.push(out);

        out.stdout.on('data', (data) => {
            console.log('stdout: ' + data);
            if (socket.readyState === socket.OPEN) socket.send(data.toString());
        });

        out.on('close', (code,err) => {
            if (code === 1) {
                console.log('stderr: ' + err);
                return;
            }

            console.log("process was killed");
            if (socket.readyState === socket.OPEN) socket.send("Done");
            

            out = null;

        });


    });

    socket.on('disconnect', function() {
        console.log("Client has Disconnected");
        killall();


    });

    socket.on('close', function() {
        console.log("socket was succesfully closed");
        killall();


    });









});

server.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
);


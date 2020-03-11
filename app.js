var express = require("express");
var http = require("http");
var serveIndex = require('serve-index');



var port = process.argv[2];
var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname + '/'));
app.use('/lectures', serveIndex(__dirname + '/lectures'));



app.get("/", function(req, res) {
  res.sendFile("index.html", { root: "./" });
});

app.get("/play", function(req, res) {
  res.sendFile("play.html", { root: "./play" });
});

server.listen(port, () => {
  console.log(`Server started on port ${server.address().port}`);
});


module.exports = app;

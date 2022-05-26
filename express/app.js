var express = require('express');

var app = express();



var https = require('https');
 const fs = require('fs');

const options = {
  key: fs.readFileSync('/Users/martintakken/WebsitesTesting/audioot/key.pem'),
  cert: fs.readFileSync('/Users/martintakken/WebsitesTesting/audioot/cert.pem'),
  requestCert: false,
  rejectUnauthorized: false
};

var server = https.createServer(options, app);
// server.listen(8080);




server = app.listen(3000);

app.use(express.static('public'));

console.log("socket server running");

var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
    console.log(socket);
}



// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
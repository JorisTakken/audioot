// doorbraak: chat en acc via https!

const express = require('express');
const app = express();
const http = require('http');
//const server = http.createServer(app);


var udp = require('dgram');

const https = require('https');
var fs = require('fs');
var options = {
  key: fs.readFileSync('/Applications/MAMP/Library/OpenSSL/certs/node.local.key'),
  cert: fs.readFileSync('/Applications/MAMP/Library/OpenSSL/certs/node.local.crt'),
  ca: fs.readFileSync('/Applications/MAMP/Library/OpenSSL/certs/MAMP_PRO_Root_CA.crt')
};


const server = https.createServer(options, app);
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
   // io.emit('chat message', msg);
    console.log(msg);
  });
});
server.listen(3000, () => {
  console.log('listening on *:3000');
});



// -------------------- udp client ----------------
var buffer = require('buffer');

// creating a client socket
var client = udp.createSocket('udp4');

//buffer msg
// var data = Buffer.from('1 2 3 4');
var data = '1 2 3 4';

client.on('message',function(msg,info){
  console.log('Data received from server : ' + msg.toString());
  console.log('Received %d bytes from %s:%d\n',msg.length, info.address, info.port);
});

//sending msg
client.send(data,3000,'localhost',function(error){
  if(error){
    client.close();
  }else{
    console.log('Data sent !!!');
  }
});

// var data1 = Buffer.from('hello');
// var data2 = Buffer.from('world');

// //sending multiple msg
// client.send([data1,data2],3000,'localhost',function(error){
//   if(error){
//     client.close();
//   }else{
//     console.log('Data sent !!!');
//   }
// });
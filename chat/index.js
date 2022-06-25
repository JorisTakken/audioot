// doorbraak: chat en acc via https!

const express = require('express');
const app = express();
const http = require('http');

const { Client, Message } = require('node-osc');
const client2 = new Client('localhost', 3000);


'use strict';


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
    const message = new Message('/address');
    message.append('testing');
    message.append('testing');
    message.append(msg);

    client2.send(message, (err) => {
      if (err) {
        console.error(new Error(err));
      } else{
        console.log('Data sent 2 !!!');
      }
    // client2.close();
    });
        
  });
});



server.listen(3000, () => {
  console.log('listening on *:3000');
});





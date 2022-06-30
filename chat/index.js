
'use strict';

const express = require('express');
const app = express();
// const http = require('http');
// const axios = require('axios').default;
const { Client, Message } = require('node-osc');
const client = new Client('localhost', 3000);

// Access-Control-Allow-Origin is a CORS (Cross-Origin Resource Sharing) header.
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// server
const https = require('https');
var fs = require('fs');
var options = {
  key: fs.readFileSync('ssl/node.local.key'),
  cert: fs.readFileSync('ssl/node.local.crt'),
  ca: fs.readFileSync('ssl/MAMP_PRO_Root_CA.crt')
};

const server = https.createServer(options, app);
const { Server } = require("socket.io");
const io = new Server(server);

// get the html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/circle', (req, res) => {
  res.sendFile(__dirname + '/circle.html');
});


app.get("/square", function (req, res) {
  res.sendFile(__dirname + '/square.html');
});

app.get("/triangle", function (req, res) {
  res.sendFile(__dirname + '/triangle.html');
});


// just logging
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// send to max
io.on('connection', (socket) => {
  socket.on('event_message', (msg) => {
      // io.emit('event_message', msg);
     
    console.log(msg);
    
    
    const msgArr = msg.split(" ");
    
    const message = new Message('/TAK/' + msgArr[2] + '/');
    message.append(Number(msgArr[0]));
    message.append(Number(msgArr[1]));
    
    console.log(message);
    
      client.send(message, (err) => {
        if (err) {
          console.error(new Error(err));
        } else {
         // console.log('Data sent 2 !!!');
        }
      // client.close();  
      });
  });

});



// start serving
server.listen(3000, () => {
  console.log('listening on *:3000');
});



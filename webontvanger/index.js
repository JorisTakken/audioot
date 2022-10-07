
'use strict';

const { networkInterfaces } = require('os');



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
  key: fs.readFileSync('ssl/audioot.data-ant.com.key'),
  cert: fs.readFileSync('ssl/audioot.data-ant.com.crt'),
  ca: fs.readFileSync('ssl/MAMP_PRO_Root_CA.crt')
};

const server = https.createServer(options, app);
const { Server } = require("socket.io");
const io = new Server(server);

// get the html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/style.css', (req, res) => {
  res.sendFile(__dirname + '/vormen/style.css');
});


app.get('/circle', (req, res) => {
  res.sendFile(__dirname + '/vormen/1_circle.html');
});


app.get("/square", function (req, res) {
  res.sendFile(__dirname + '/vormen/2_square.html');
});

app.get("/triangle", function (req, res) {
  res.sendFile(__dirname + '/vormen/3_triangle.html');
});

app.get("/star", function (req, res) {
  res.sendFile(__dirname + '/vormen/4_star.html');
});


app.get('/moon', (req, res) => {
  res.sendFile(__dirname + '/vormen/5_moon.html');
});

app.get("/pentagon", function (req, res) {
  res.sendFile(__dirname + '/vormen/6_pentagon.html');
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

    const message = new Message('/TAK/' + msgArr[0] + '/');
    message.append(Number(msgArr[1]));
    message.append(Number(msgArr[2]));
    if (msgArr[3]) {
      message.append(Number(msgArr[3]));
    }

  //   console.log(message);
    
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


  const nets = networkInterfaces();
  const results = Object.create(null); // Or just '{}', an empty object
  
  for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
          // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
          // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
          const familyV4Value = typeof net.family === 'string' ? 'IPv4' : 4
          if (net.family === familyV4Value && !net.internal) {
              if (!results[name]) {
                  results[name] = [];
              }
              results[name].push(net.address);
          }
      }
  }
  
  console.log('lokaal adres in eigen netwerk: https://' + results["en0"][0] + ':3000');
  




  //console.log('listening on *:3000');
});



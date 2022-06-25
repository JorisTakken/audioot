// doorbraak: chat en acc via https!

const express = require('express');
const app = express();
const http = require('http');
const axios = require('axios').default;
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
var ip = '';
getIpClient();


io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    // io.emit('chat message', msg);

    if (ip!='') {

      console.log(ip);
      console.log(msg);
  
      // /w5c9FHmopCq6QU-u/deviceinfo "iPhone 6s" w5c9FHmopCq6QU-u ios 15.5 750 1334
      // receivedmess: /ZIGSIM/w5c9FHmopCq6QU-u/compass 224.804474 0
      // receivedmess: /ZIGSIM/w5c9FHmopCq6QU-u/gyro -0.014816 -0.034539 -0.000338
      // receivedmess: /ZIGSIM/w5c9FHmopCq6QU-u/gyro -0.014816 -0.034539 77.25766
  
  
      const message = new Message('/ZIGSIM/w5c9FHmopCq6QU-u/gyro');
      message.append(msg);
      message.append(ip);
  
      client2.send(message, (err) => {
        if (err) {
          console.error(new Error(err));
        } else {
         // console.log('Data sent 2 !!!');
        }
      // client2.close();
        
        
      });
    }
        
  });
});



server.listen(3000, () => {
  console.log('listening on *:3000');
});






async function getIpClient() {
  try {
    const response = await axios.get('https://api.ipify.org?format=json');
    ip = response.data.ip;
  } catch (error) {
    console.error(error);
  }
}


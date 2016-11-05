const express = require('express');
// try importing these
const bodyparser = require('body-parser').urlencoded({extended: true});
const jsonparser = require('body-parser').json();
// Configuration
const server = express();
const serverObj = require('http').Server(server);

const PORT = process.env.PORT || 3000;

const serverHandle = server.listen(PORT, () => {
  console.log('----===***WELCOME***===----');
  console.log(`Listening on localhost:${PORT}`);
  console.log('---===---===---===---===---');
});

const io = require('socket.io')(serverHandle);

// io.on('connection', (socket) => {
//   console.log('a user connected');
//
//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });

const { retrieveToDos, validateAndCommitPost } = require('../server/db');
const socketController = require('./socketController');
socketController.initSocket(io);

// Standard Middleware
server.use(express.static(`${__dirname}/../dist`));
server.use(bodyparser);
server.use(jsonparser);

// api routes
// server.get('/todo', retr);
// server.post('/todo', validateAndCommitPost)

var app = require('express')();
// var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);

// app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
  });
});

// send an event to everyone:
// io.emit('some event', { for: 'everyone' });
//
// // send a message to everyone except for a certain socket:
// io.on('connection', function(socket){
//   socket.broadcast.emit('hi');
// });

// send a message to everyone, including sender:
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});









http.listen(3000, function() {
  console.log('Listening on 3000');
});

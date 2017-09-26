var firebase = require('firebase');
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyB3q8ounWVupMq4P30LQp2sKzJlQILxWJU",
    authDomain: "fir-nodejs-d8581.firebaseapp.com",
    databaseURL: "https://fir-nodejs-d8581.firebaseio.com",
    projectId: "fir-nodejs-d8581",
    storageBucket: "",
    messagingSenderId: "631646037337"
  };
  firebase.initializeApp(config);

var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParse = require('body-parser');
var parser = bodyParse.urlencoded({extended: false});

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
http.listen(3000, function(){
  console.log('listening on *:3000');
});

var arrNote = ["Android", "NodeJS", "Docker"];

app.get("/", function(req, res) {
  res.render("home");
});

app.post("/getNote", function(req, res) {
  res.send(arrNote);
});

app.post("/add", parser, function(req, res) {
  var newNote = req.body.note;
  arrNote.push(newNote);
  res.send(arrNote);
});

app.post("/delete", parser, function(req, res) {
  var id = req.body.noteId;
  arrNote.splice(id, 1);
  res.send(arrNote);
});

app.post("/update", parser, function(req, res) {
  var id = req.body.noteId;
  arrNote[id] = req.body.noteContent;
  res.send(arrNote);
});

//use socket
io.on('connection', function(socket){
  console.log('a user connected');
});

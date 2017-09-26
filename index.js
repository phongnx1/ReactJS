// var firebase = require('firebase');
// // Initialize Firebase
//   var config = {
//     apiKey: "AIzaSyB3q8ounWVupMq4P30LQp2sKzJlQILxWJU",
//     authDomain: "fir-nodejs-d8581.firebaseapp.com",
//     databaseURL: "https://fir-nodejs-d8581.firebaseio.com",
//     projectId: "fir-nodejs-d8581",
//     storageBucket: "",
//     messagingSenderId: "631646037337"
//   };
//   firebase.initializeApp(config);

var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");

// connect Database
var pool = mysql.createPool({
  host: '192.168.33.55',
  port: 6603,
  user: 'testuser1',
  password: '123456',
  database: 'test'
});

app.get("/", function(req, res) {
  res.render("home");
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

var arrNote = [];
const SELECT_SQL = "SELECT * FROM `NOTE`";

app.post("/getNote", function(req, res) {
  /*Should be create function getListNote*/
  pool.query(SELECT_SQL, function(error, result){
    if (error) {
      console.log('– error select list note –');
    } else {
      arrNote = result;
      res.send(arrNote);
    }
  });
});

//use socket
io.on('connection', function(socket){
  console.log('a user connected');

// listening add event
  socket.on('add_note', function(newNote){
    /*Should be create function addNote*/
    var sql = "INSERT INTO `NOTE` (NOTE_CONTENT) VALUES ('" + newNote + "')";
    pool.query(sql, function(error, result){
      if (error) {
        console.log('– error add note ');
      } else {
        pool.query(SELECT_SQL, function(error, result){
          arrNote = result;
          io.emit('add_note', arrNote);
        });
      }
    });
  });

// listening delete event
  socket.on('delete_note', function(noteId){
    /*Should be create function deleteNote*/
    var sql = "DELETE FROM `NOTE` WHERE NOTE_ID ='" + noteId + "'";
    pool.query(sql, function(error, result){
      if (error) {
        console.log('– error delete note ');
      } else {
        pool.query(SELECT_SQL, function(error, result){
          arrNote = result;
          io.emit('delete_note', arrNote);
        });
      }
    });
  });

// listening update event
  socket.on('update_note', function(data){
    /*Should be create function updateNote*/
    var sql = "UPDATE `NOTE` SET NOTE_CONTENT ='" + data.noteContent + "' WHERE NOTE_ID ='" + data.noteId + "'";
    pool.query(sql, function(error, result){
      if (error) {
        console.log('– error update note –');
      } else {
        pool.query(SELECT_SQL, function(error, result){
          arrNote = result;
          io.emit('update_note', arrNote);
        });
      }
    });
  });

});

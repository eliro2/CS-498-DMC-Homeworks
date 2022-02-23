const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');

// Connect to a mysql Database
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'master',
  password : 'masterpassword',
  database : 'mydb'
});

// Connect to other VM
var connection 2 = mysql.createConnection({
  host : '34.69.134.109',
  user : 'master',
  password : 'masterpassword',
  database : 'mydb'
});

// Connections
connection.connect();
connection2.connect();

// Initialize a web app
const app = express();
app.use(bodyParser.json());

// Handle requests to the base IP/URL
app.get('/greeting', (req,res) => {
  res.json('Hello World!');
});

// Handle insert operations to our database
app.post('/register', (req,res) => {
  let n = req.body
  n = n.replace(/^[0-9\s]*|[+*\r\n]/g, '');
  query = `INSERT INTO Users (username) VALUES ('`+n+`');`;
  connection2.query(query, (e,r,f) => {
    console.log(r);
    res.json({'message': 'Add Successful', 'users':r});
  });
});

// Handle listing of users
app.get('/list', (req,res) => {
  query = 'SELECT username FROM Users';
  connection2.query(query, (e,r,f) => {
    let nameList = []
    for (const i in r) {
      nameList.push(r[i].username);
    }
    res.json({"users": nameList});
  });
});

// Handle clearing of user from database
app.post('/clear', (req,res) => {
  query = 'TRUNCATE Users';
  connection2.query(query, (e,r,f) => {
    res.json({'message': 'Removed Users'});
  });
});

var http = require('http').Server(app);

const PORT = 80;
http.listen(PORT, function() {
  console.log('Listening');
});

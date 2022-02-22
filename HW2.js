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


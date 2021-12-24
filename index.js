// This is the Web Server
require('dotenv').config();
const express = require('express');
const server = express();

// create logs for everything
const morgan = require('morgan');
server.use(morgan('dev'));

// handle application/json requests
const bodyParser = require('body-parser');
server.use(bodyParser.json());

// here's our static files
const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));

server.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// here's our API
server.use('/api', require('./routes'));

// by default serve up the react app if we don't recognize the route
server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});


// bring in the DB connection
const { client } = require('./db');

server.use((err, req, res, next) => {
  res.status(500).send(err)
})

// connect to the server
const { PORT = 4000 } = process.env;
server.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});

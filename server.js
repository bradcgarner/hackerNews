'use strict';
// express
const express = require('express');
// middleware
const morgan = require('morgan');
const bodyParser = require('body-parser');
// imports
const { DATABASE, PORT } = require('./config');
// instantiate express
const app = express();
// invoke always use functions
app.use(morgan(':method :url :res[location] :status')); // what is 'common' setting?
app.use(bodyParser.json());

app.get('/', (req, res) => {

});

let server;
let knex;

// general mocha question: how is the folder "test" mapped?

function runServer(database = DATABASE, port = PORT) {
  return new Promise((resolve, reject) => {
    try {
      knex = require('knex')(database); // why do we have (database) after it?
      server = app.listen(port, () => {
        console.info(`App listening on port ${server.address().port}`); // how does this work?
        resolve();
      });
    }
    catch(err) {
      console.error(`Can't start server: ${err}`);
      reject(err);
    }
  });
}

function closeServer() {
  return knex.destroy().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err=>{
        if(err){
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer().catch(err => {
    console.error(`Can't start server: ${err}`);
    throw err;
  });
}

module.exports = { app, runServer, closeServer};
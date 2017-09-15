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

app.post('/api/stories', (req, res) => {
  // validate data from user first before knex
  let {title, url } = req.body;
  // Sending a votes property should not allow users to cheat the system by setting an arbitrary number of upvotes 
  
  knex('news')
    .insert({
      title: title,
      url: url
    })
    .returning(['id','title','url'])
  // It should respond with a 201 Created status and the story // WHAT MEANT BY STORY????
    .then((story)=>{
      console.log('returning posted data', story);
      res.status(201).json(
        story[0]
      );
    }); 
  // Test your endpoint by:
  // Using Postman to add some stories
  // Using the shell to make sure they were added to the database
});

app.get('/api/stories', (req, res) =>{
  // let arrOfStories = []; // final array of stories to return
  // let objOfStories = {}; // keeps track of keys
  knex('news')
    .select('title', 'url', 'votes', 'tags.name as tag')
    .select(knex.raw("CONCAT (author.name_first, ' ', author.name_last) as author"))
    .innerJoin('news_tags', 'news.id', 'news_tags.id_news')
    .innerJoin('tags', 'news_tags.id_tags', 'tags.id')
    .innerJoin('author', 'news.id_author', 'author.id')
    .orderBy('title')
    // if the story is not already in the array, push it to the array
    // .then()

    // in all cases, push the tags to the story object (in the array)



    .then((story) => {
      res.status(200).json(story);
    });
});

app.put('/api/stories/:id', (req, res) => {
  knex('news')
    .increment('votes')
    .where('id', req.params.id)
    .then(() => {
      res.sendStatus(204);
    });
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

module.exports = { app, runServer, closeServer, DATABASE};
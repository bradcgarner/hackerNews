'use strict';
// import middleware
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
// import from other files
const { app, runServer, closeServer, DATABASE } = require('../server');
// invoke middleware
chai.use(chaiHttp);
const knex = require('knex')(DATABASE);

function seedData() {
  return knex('news') // seedData needs to return a promise, so we need to return knex(). Otherwise seedData returns undefined.
    .insert([
      {title: 'Fake News',
        url: 'www.foxnews.com',
        votes: 600},
      {title: 'My News',
        url: 'www.mynews.com',
        votes: 3},
      {title: 'Early News',
        url: 'www.tooearly.com',
        votes: 5},
      {title: 'Montana State Police News',
        url: 'www.idriveveryfast.com',
        votes: 88},
      {title: 'Bigly Yuge News!',
        url: 'www.forreal.com',
        votes: 108353},
      {title: 'How To Skin A Catfish',
        url: 'www.whatilearnedasakid.com',
        votes: 365},
      {title: 'Everything You Need To Know',
        url: 'www.eyntk.io',
        votes: 8753},
      {title: 'Tired of News?',
        url: 'www.getsomesleep.net',
        votes: 352},
      {title: 'News Your Crazy Uncle Watches',
        url: 'www.crazy.com',
        votes: 666}]
    );
}

describe('Hacker News API', function() {
  before(function () { // mocha's describe.before function expects to return promises. We do not end the promises with .then() because that is built into Mocha.
    return runServer(); // runServer() returns a promise (though hard to see)
  });

  beforeEach(function () {
    return seedData(); // similar to above, but nested. seedData() must return a promise as well.
  });

  afterEach(function () {
    return knex('news') // knex returns promisable objects, not technically promises until the promise is called (usually via a .then() method). Because mocha has built-in chaining of promises, we do not need to call a .then() here.
      .del();
  });

  after(function () {
    return closeServer(); // closeServer() returns a promise (and easy to see)
  });

  describe('Start Test Suite', function() {
    it('should be true', function() {
      return chai.request(app)
        .get('/api/stories')
        .then(function(res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          //res.body.length.should.be.at.least(1);
          res.body.should.have.lengthOf.below(21);
          const expectedKeys = ['id', 'title', 'url', 'votes'];
          res.body.forEach(function(item){
            item.should.be.a('object');
            item.should.include.keys(expectedKeys);
          });
        });
    });

    // it('should be true', function() {
    //   return chai.request(app)
    //     .post('/api/stories')
    //     .then(function(res) {
    //       res.should.have.status(204);
    //     });
    // });

    // it('should be true', function() {
    //   return chai.request(app)
    //     .put('/api/stories/:id')
    //     .then(function(res) {
    //       res.should.have.status(204);
    //     });
    // });
  });

});
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
  return knex('news')
    .insert([
      {
        title: 'Fake News',
        url: 'www.foxnews.com',
        votes: 600
      },
      {
        title: 'My News',
        url: 'www.mynews.com',
        votes: 3
      },
      {
        title: 'Early News',
        url: 'www.tooearly.com',
        votes: 5
      },
      {
        title: 'Montana State Police News',
        url: 'www.idriveveryfast.com',
        votes: 88
      },
      {
        title: 'Bigly Yuge News!',
        url: 'www.forreal.com',
        votes: 108353
      },
      {
        title: 'How To Skin A Catfish',
        url: 'www.whatilearnedasakid.com',
        votes: 365
      },
      {
        title: 'Everything You Need To Know',
        url: 'www.eyntk.io',
        votes: 8753
      },
      {
        title: 'Tired of News?',
        url: 'www.getsomesleep.net',
        votes: 352
      },
      {
        title: 'News Your Crazy Uncle Watches',
        url: 'www.crazy.com',
        votes: 666
      }]
    );
   


  //console.info('We need to create test data here');
}


describe('Hacker News API', function() {
  before(function () {
    return runServer();
  });

  beforeEach(function () {
    return seedData();
    
    
  });

  afterEach(function () {
    return knex('news')
      .del();
      
  });

  after(function () {
    return closeServer();
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
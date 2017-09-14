'use strict';
// import middleware
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
// import from other files
const { app, runServer, closeServer } = require('../server');
// invoke middleware
chai.use(chaiHttp);

function seedData() {
  console.info('We need to create test data here');
}

describe('Hacker News API', function() {
  before(function () {
    return runServer();
  });

  beforeEach(function () {

  });

  afterEach(function () {

  });

  after(function () {
    return closeServer();
  });

  describe('Start Test Suite', function() {
    it('should be true', function() {
      true.should.be.true;
    });
  });

});


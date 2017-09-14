'use strict';

const DATABASE_URL = process.env.DATABASE_URL  || global.DATABASE_URL || 'postgresql://localhost/hackerNews';

exports.DATABASE = {
  client: 'pg',
  connection: DATABASE_URL,
  debug: true,
  pool: { min: 0, max: 3},
};

exports.PORT = process.env.PORT || 8080;
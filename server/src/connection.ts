import config from './config';

const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: config.database
});

export default knex;

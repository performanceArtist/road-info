import config from './config';
import { io } from './server';

const EventEmitter = require('events');
const util = require('util');
const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: config.database
});

const { Client } = require('pg');
const client = new Client(config.database);

function DbEventEmitter() {
  EventEmitter.call(this);
}

util.inherits(DbEventEmitter, EventEmitter);
const dbEventEmitter = new DbEventEmitter();

dbEventEmitter.on('new_user', user => {
  console.log('New user: ' + user.login);
});

dbEventEmitter.on('new_measurement', async measurement => {
  const section = await knex('measurement_sections')
    .select('*')
    .where({ id: measurement.measurement_section_id })
    .first();

  const data = {
    distance: section.distance,
    density: measurement.density,
    thickness: measurement.depth,
    rutting: 0,
    iri: 0
  };

  console.log(data);
  io.emit('newMeasurement', data);
});

client.connect();

// Listen for all pg_notify channel messages
client.on('notification', async data => {
  const payload = JSON.parse(data.payload);
  dbEventEmitter.emit(data.channel, payload);
});

client.query('LISTEN new_user');
client.query('LISTEN new_measurement');

export default knex;

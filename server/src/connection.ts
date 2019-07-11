import config from './config';
import { io } from './server';
import { UserType } from './models/User';
import { MeasurementType } from './models/Measurement';
import { EventEmitter } from 'events';

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

let lastSection: MeasurementType | null = null;

dbEventEmitter.on('new_measurement', async (measurement: MeasurementType) => {
  const section = await knex('measurement_sections')
    .select('*')
    .where({ id: measurement.measurement_section_id })
    .first();

  if (lastSection && section.distance - lastSection.distance < 0.01) {
    return;
  }
  lastSection = section;

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

// listen for all pg_notify channel messages
client.on(
  'notification',
  async (data: { payload: string; channel: string }) => {
    const payload = JSON.parse(data.payload);
    dbEventEmitter.emit(data.channel, payload);
  }
);

client.query('LISTEN new_measurement');

// test
/*
client.query('LISTEN new_user');
dbEventEmitter.on('new_user', (user: UserType) => {
  console.log('New user: ' + user.login);
});
*/

export default knex;

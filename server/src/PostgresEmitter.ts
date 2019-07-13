import { EventEmitter } from 'events';
import knex from './connection';

import { io } from './server';
import { MeasurementType } from './models/Measurement';

const postgresEmitter = (function() {
  const emitter = new EventEmitter();
  let lastSection: MeasurementType | null = null;

  emitter.on('new_measurement', async (measurement: MeasurementType) => {
    const section = await knex('measurement_sections')
      .select('*')
      .where({ id: measurement.measurement_section_id })
      .first();

    if (section.distance == 0) {
      lastSection = null;
      console.log('Start');
      return;
    }

    if (lastSection && section.distance - lastSection.distance < 0.001) {
      console.log('No distance', section.distance - lastSection.distance);
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

  return emitter;
})();

export default postgresEmitter;

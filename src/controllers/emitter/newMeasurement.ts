import knex from '@root/connection';
import { io } from '@root/server';

let lastSection = null;

export default async measurement => {
  console.log(measurement);
  const section = await knex('measurement_sections')
    .select('*')
    .where({ id: measurement.measurement_section_id })
    .first();

  const measurementBase = await knex('measurements')
    .select('*')
    .where({ id: section.measurement_id })
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
    latitude: section.latitude,
    longitude: section.longitude,
    density: measurement.density,
    thickness: measurement.depth,
    rutting: 0,
    iri: 0
  };

  io.emit('message', {
    type: 'newMeasurement',
    payload: {
      taskId: measurementBase.order_id,
      instanceId: section.measurement_id,
      data
    }
  });
};

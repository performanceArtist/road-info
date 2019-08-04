import { EventEmitter } from 'events';
import knex from './connection';

import { io } from './server';
import { MeasurementType } from './models/Measurement';

const postgresEmitter = (function() {
  const emitter = new EventEmitter();
  let lastSection: MeasurementType | null = null;

  emitter.on(
    'new_base',
    async ({
      id,
      kondor_id,
      road_part_id,
      start_distance,
      finish_distance,
      lane_number,
      description
    }) => {
      try {
        const kondor = await knex('kondors')
          .select('*')
          .where({ id: kondor_id })
          .first();
        const { name: partName, road_id, lanes_count, length } = await knex(
          'road_parts'
        )
          .select('*')
          .where({ id: road_part_id })
          .first();

        const { name: roadName, city_id } = await knex('roads')
          .select('*')
          .where({ id: road_id })
          .first();

        const { name: city, region_id } = await knex('cities')
          .select('*')
          .where({ id: city_id })
          .first();

        const { name: region } = await knex('regions')
          .select('*')
          .where({ id: region_id })
          .first();

        io.emit('message', {
          type: 'newBase',
          payload: {
            id,
            start: start_distance,
            finish: finish_distance,
            lane: lane_number,
            lanesCount: lanes_count,
            description,
            kondor: kondor.serial_number,
            partName,
            roadName,
            city,
            region
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  );

  emitter.on('new_measurement', async (measurement: MeasurementType) => {
    const section = await knex('measurement_sections')
      .select('*')
      .where({ id: measurement.measurement_section_id })
      .first();

    const base = await knex('measurements')
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
        id: base.id,
        measurement: data
      }
    });
  });

  return emitter;
})();

export default postgresEmitter;

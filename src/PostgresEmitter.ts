import { EventEmitter } from 'events';
import knex from './connection';

import { io } from './server';
import { MeasurementType } from './models/Measurement';

const postgresEmitter = (function() {
  const emitter = new EventEmitter();
  let lastSection: MeasurementType | null = null;

  emitter.on(
    'new_order',
    async ({
      id,
      number,
      customer_id,
      reporter_id,
      description,
      kondor_id,
      status,
      direction,
      start_distance,
      finish_distance,
      road_part_id
    }) => {
      try {
        const { name: roadPartName, road_id, lanes_count } = await knex(
          'road_parts'
        )
          .select('*')
          .where({ id: road_part_id })
          .first();

        const {
          name: road,
          fias_id: roadId,
          city_id,
          settlement_id
        } = await knex('roads')
          .select('*')
          .where({ id: road_id })
          .first();

        let settlement = null;
        let settlementId = null;

        if (settlement_id) {
          const oldSettlement = await knex('settlements')
            .select('*')
            .where({ id: settlement_id })
            .first();

          settlement = oldSettlement.name;
          settlementId = oldSettlement.fias_id;
        }

        const { name: city, fias_id: cityId, region_id } = await knex('cities')
          .select('*')
          .where({ id: city_id })
          .first();

        const { name: region, fias_id: regionId } = await knex('regions')
          .select('*')
          .where({ id: region_id })
          .first();

        const directions = { forward: false, backward: false };
        directions.forward = direction === 'forward' || direction === 'both';
        directions.backward = direction === 'backward' || direction === 'both';

        io.emit('message', {
          type: 'newOrder',
          payload: {
            id,
            order: number,
            status,
            start: start_distance,
            finish: finish_distance,
            ...directions,
            lanesCount: lanes_count,
            description,
            kondor: kondor_id,
            roadPartName,
            street: road,
            streetId: roadId,
            settlement,
            settlementId,
            city,
            cityId,
            region,
            regionId
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  );

  emitter.on('order_update', async ({ id, status, kondor_id }) => {
    const payload = {
      id,
      status,
      kondor: kondor_id
    };

    if (status !== 'ready') {
      const { lane_number, is_direction_forward } = await knex('measurements')
        .select('*')
        .where({ order_id: id })
        .first();

      payload.lane = lane_number;
      payload.isForward = is_direction_forward;
    }

    io.emit('message', {
      type: 'orderUpdate',
      payload
    });
  });

  emitter.on('new_measurement', async (measurement: MeasurementType) => {
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
        data
      }
    });
  });

  return emitter;
})();

export default postgresEmitter;

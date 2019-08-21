import knex from '@root/connection';
import { io } from '@root/server';

export default async ({
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

    const { name: road, fias_id: roadId, city_id, settlement_id } = await knex(
      'roads'
    )
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
};

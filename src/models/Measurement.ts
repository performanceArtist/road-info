import knex from '../connection';

export interface MeasurementType {
  distance: number;
  latitude: number;
  longitude: number;
  density: number;
  depth: number;
  measurement_section_id: number;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getLastId = async (
  from: string,
  name: string,
  fiasId: string,
  insert = {}
) => {
  const oldRegion = await knex(from)
    .select('*')
    .where({ fias_id: fiasId })
    .first();
  let newRegionId = null;

  if (!oldRegion) {
    newRegionId = await knex(from)
      .insert({ name, fias_id: fiasId, ...insert })
      .returning('id');
  }

  return oldRegion ? parseInt(oldRegion.id, 10) : parseInt(newRegionId, 10);
};

export async function createTask({
  order,
  customer,
  executor,
  description,
  city,
  cityId,
  region,
  regionId,
  settlement,
  settlementId,
  street,
  streetId,
  roadPartName,
  lanesCount,
  forward,
  backward,
  start,
  finish
}: {
  [key: string]: string;
}) {
  const lastRegionId = await getLastId('regions', region, regionId);
  const lastCityId = await getLastId('cities', city, cityId, {
    region_id: lastRegionId
  });
  const lastSettlementId = settlement
    ? await getLastId('settlements', settlement, settlementId, {
        city_id: lastCityId
      })
    : null;
  const lastRoadId = await getLastId('roads', street, streetId, {
    city_id: lastCityId,
    settlement_id: lastSettlementId
  });

  const roadPartId = await knex('road_parts')
    .insert({
      name: roadPartName,
      lanes_count: parseInt(lanesCount, 10),
      road_id: lastRoadId
    })
    .returning('id');

  let direction = '';

  if (forward) direction = 'forward';
  if (backward) direction = 'backward';
  if (forward && backward) direction = 'both';

  await knex('orders').insert({
    number: order,
    customer_id: parseInt(customer, 10),
    reporter_id: parseInt(executor, 10),
    description,
    start_distance: start,
    finish_distance: finish,
    direction,
    road_part_id: parseInt(roadPartId, 10)
  });
}

export async function generateMeasurements({ id, lane, kondorId, isForward }) {
  await knex('orders')
    .where({ id })
    .update({ status: 'taken', kondor_id: kondorId });

  const baseId = await knex('measurements')
    .insert({
      order_id: id,
      is_direction_forward: isForward,
      lane_number: lane
    })
    .returning('id');

  const distance = 100 * (Math.round(Math.random() * 30) + 10);
  let counter = 0;

  for (let i = distance; i >= 0; i -= 100) {
    await delay(400);

    const measurement = {
      distance: distance - i,
      latitude: 56.48 - counter * 0.0005,
      longitude: 84.95 + Math.random() / 1000,
      measurement_id: baseId[0]
    };

    counter++;

    const lastId = await knex('measurement_sections')
      .insert(measurement)
      .returning('id');

    const roadLayer = {
      density: Math.random() * 5,
      depth: Math.random() * 2,
      measurement_section_id: parseInt(lastId, 10),
      layer_type_id: 1,
      impulse_count: 2
    };

    await knex('road_layers').insert(roadLayer);
  }

  await knex('orders')
    .where({ id })
    .update({ status: 'done' });
}

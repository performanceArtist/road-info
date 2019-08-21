import knex from '@root/connection';

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

export default async ({
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
}) => {
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
    number: parseInt(order, 10),
    customer_id: parseInt(customer, 10),
    reporter_id: parseInt(executor, 10),
    description,
    start_distance: start,
    finish_distance: finish,
    direction,
    road_part_id: parseInt(roadPartId, 10)
  });
};

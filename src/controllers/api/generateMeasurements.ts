import knex from '@root/connection';

export interface MeasurementType {
  distance: number;
  latitude: number;
  longitude: number;
  density: number;
  depth: number;
  measurement_section_id: number;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default async ({ id, lane, kondorId, isForward }) => {
  const baseId = await knex('measurements')
    .insert({
      order_id: id,
      is_direction_forward: isForward || false,
      lane_number: lane
    })
    .returning('id');

  await knex('orders')
    .where({ id })
    .update({ status: 'taken', kondor_id: kondorId });

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
};

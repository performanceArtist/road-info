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

export async function createMeasurement({
  start = 0,
  finish = 2000,
  lane = 1,
  kondor = 1
} = {}) {
  const baseId = await knex('measurements')
    .insert({
      kondor_id: kondor,
      lane_number: lane,
      road_part_id: 1,
      order_id: 1,
      builder_id: 1,
      is_direction_forward: true,
      start_distance: start,
      finish_distance: finish
    })
    .returning('id');

  return baseId;
}

export async function generateMeasurements(baseId: string) {
  const distance = 100 * (Math.round(Math.random() * 30) + 10);
  let counter = 0;

  for (let i = distance; i >= 0; i -= 100) {
    await delay(400);
    const date = new Date();

    const measurement = {
      distance: distance - i,
      latitude: 56.48 - counter * 0.0005,
      longitude: 84.95 + Math.random() / 1000,
      time: date.toUTCString(),
      measurement_id: baseId
    };

    counter++;

    const lastId = await knex('measurement_sections')
      .insert(measurement)
      .returning('id');

    const roadLayer = {
      density: Math.random() * 5,
      depth: Math.random() * 2,
      measurement_section_id: lastId[0],
      layer_type_id: 1,
      impulse_count: 2
    };

    await knex('road_layers').insert(roadLayer);
  }
}

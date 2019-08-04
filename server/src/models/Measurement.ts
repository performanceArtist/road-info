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

export async function makeRoute() {
  const angles = [
    { coordinates: [56.479196, 84.949937], distance: 100 },
    { coordinates: [56.476205, 84.949937], distance: 200 },
    { coordinates: [56.4786975, 84.949937], distance: 300 },
    { coordinates: [56.4786199, 84.949937], distance: 400 },
    { coordinates: [56.4777005, 84.949937], distance: 500 },
    { coordinates: [56.477202, 84.949937], distance: 600 },
    { coordinates: [56.4767035, 84.949937], distance: 700 },
    { coordinates: [56.476264, 84.953049], distance: 800 },
    { coordinates: [56.477947, 84.953049], distance: 900 },
    { coordinates: [56.477882, 84.955463], distance: 1000 }
  ];

  angles.forEach((angle, index) => {
    setTimeout(async () => {
      const date = new Date();

      const measurement = {
        distance: angle.distance,
        latitude: angle.coordinates[0],
        longitude: angle.coordinates[1],
        time: date.toUTCString(),
        measurement_id: 1
      };

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
    }, angles.indexOf(angle) * 100);
  });
}

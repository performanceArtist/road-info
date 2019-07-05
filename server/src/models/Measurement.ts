import knex from '../connection';

export async function generateMeasurements() {
  const distance = 100 * (Math.round(Math.random() * 30) + 10);

  try {
    for (let i = distance; i >= 0; i -= 100) {
      const date = new Date();

      const measurement = {
        distance: distance - i,
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
    }
  } catch (error) {
    console.log(error);
  }
}

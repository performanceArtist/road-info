import knex from '../connection';

export interface MeasurementType {
  distance: number;
  latitude: number;
  longitude: number;
  density: number;
  depth: number;
  measurement_section_id: number;
}

export async function generateMeasurements() {
  const distance = 100 * (Math.round(Math.random() * 30) + 10);
  let counter = 0;

  try {
    for (let i = distance; i >= 0; i -= 100) {
      const changeDirection = counter % 6 === 0;
      const lng = changeDirection ? counter * 0.0005 : Math.random() / 1000;

      setTimeout(async () => {
        const date = new Date();

        const measurement = {
          distance: distance - i,
          latitude: 56.48 - counter * 0.0005,
          longitude: 84.95 + Math.random() / 1000,
          time: date.toUTCString(),
          measurement_id: 1
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
      }, (distance - i) * 2);
    }
  } catch (error) {
    console.log(error);
  }
}

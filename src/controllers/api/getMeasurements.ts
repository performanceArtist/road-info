import knex from '@root/connection';

export default async (instanceId: string) => {
  const measurements = await knex('measurement_sections')
    .select('*')
    .where({ measurement_id: instanceId });
  const filteredMeasurements = measurements.map(
    ({ latitude, longitude, distance }) => ({ latitude, longitude, distance })
  );

  const ids = measurements.map(({ id }) => id);

  const roadLayers = await knex('road_layers')
    .select('*')
    .whereIn('measurement_section_id', ids);

  const filteredLayers = roadLayers.map(
    ({ depth, density, iri = 0, rutting = 0 }) => ({
      density,
      thickness: depth,
      iri,
      rutting
    })
  );

  const merged = filteredMeasurements.map((measurement, index) => ({
    ...measurement,
    ...filteredLayers[index]
  }));

  return merged;
};

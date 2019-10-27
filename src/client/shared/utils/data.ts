import { ServerMeasurement } from '@shared/types';

export function extractMeasurements(data: ServerMeasurement[]) {
  return data.map(
    ({ distance, thickness, density, iri, coleinost: rutting }) => {
      return { distance, thickness, density, iri, rutting };
    }
  );
}

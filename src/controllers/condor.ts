import knex from '@root/connection';

import {
  CondorInfo,
  DatabaseCondorInfo,
  CondorValue,
  GPSCoordinates
} from '@shared/types';

export async function getCondorInfo(id: number): Promise<CondorInfo> {
  const info: DatabaseCondorInfo[] = await knex('condor_diagnostics')
    .select('*')
    .where({ condor_id: id });

  return toCondorInfo(info);
}

export function getInfoValue<T>(info: DatabaseCondorInfo | undefined, def: T) {
  const value = info && (JSON.parse(info.value) as T);
  return info && value ? value : def;
}

export function inferInfoValue(info: DatabaseCondorInfo): CondorValue {
  const { node_id } = info;

  switch (node_id) {
    case 'coordinates':
      return {
        key: node_id,
        value: getInfoValue<GPSCoordinates>(info, [0, 0])
      };
    case 'speed':
      return { key: node_id, value: getInfoValue<number>(info, 0) };
  }
}

export function toCondorInfo(info: DatabaseCondorInfo[]): CondorInfo {
  const speed = info.find(({ node_id }) => node_id === 'speed');
  const coordinates = info.find(({ node_id }) => node_id === 'coordinates');

  return {
    speed: getInfoValue<number>(speed, 0),
    coordinates: getInfoValue<GPSCoordinates>(coordinates, [0, 0])
  };
}

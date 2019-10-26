import knex from '@root/connection';

import {
  ServerCondor,
  CondorValue,
  GPSCoordinates,
  DatabaseCondorInfo
} from '@shared/types';

export async function getServerCondor(id: number): Promise<ServerCondor> {
  const info: DatabaseCondorInfo[] = await knex('condor_diagnostics')
    .select('*')
    .where({ condor_id: id });

  return toServerCondor(info, id);
}

export async function getCondors(): Promise<ServerCondor[]> {
  const condors: DatabaseCondorInfo[] = await knex('condors').select('*');
  const ids = condors.map(condor => condor.id);
  return await Promise.all(ids.map(getServerCondor));
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

export function toServerCondor(
  info: DatabaseCondorInfo[],
  id: number
): ServerCondor {
  const speed = info.find(({ node_id }) => node_id === 'speed');
  const coordinates = info.find(({ node_id }) => node_id === 'coordinates');

  return {
    id,
    speed: getInfoValue<number>(speed, 0),
    coordinates: getInfoValue<GPSCoordinates>(coordinates, [0, 0])
  };
}

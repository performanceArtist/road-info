import { io } from '@root/server';
import { DatabaseMeasurement } from '@shared/types';
import { toServerMeasurement } from '@root/controllers/task';

export default async function newMeasurement(measurement: DatabaseMeasurement) {
  io.emit('message', {
    type: 'new_measurement',
    payload: toServerMeasurement(measurement)
  });
}

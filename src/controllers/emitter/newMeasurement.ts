import { io } from '@root/server';
import { DatabaseMeasurement } from '@shared/types';

export default async function newMeasurement(measurement: DatabaseMeasurement) {
  io.emit('message', {
    type: 'new_measurement',
    payload: measurement
  });
}

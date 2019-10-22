import knex from '@root/connection';
import { io } from '@root/server';

export default async ({ id, status, condor_id }) => {
  try {
    if (status !== 'ready') {
      const { lane_number, is_direction_forward } = await knex('measurements')
        .select('*')
        .where({ order_id: parseInt(id, 10) })
        .first();

      io.emit('message', {
        type: 'orderUpdate',
        payload: {
          id,
          status,
          condor: condor_id,
          lane: lane_number,
          isForward: is_direction_forward
        }
      });
    }
  } catch (error) {
    console.log(error);
    return;
  }
};

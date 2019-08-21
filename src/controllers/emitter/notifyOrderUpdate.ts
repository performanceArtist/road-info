import knex from '@root/connection';
import { io } from '@root/server';

export default async ({ id, status, kondor_id }) => {
  const payload = {
    id,
    status,
    kondor: kondor_id
  };

  try {
    if (status !== 'ready') {
      const { lane_number, is_direction_forward } = await knex('measurements')
        .select('*')
        .where({ order_id: parseInt(id, 10) })
        .first();

      payload.lane = lane_number;
      payload.isForward = is_direction_forward;
    }
  } catch (error) {
    console.log(error);
    return;
  }

  io.emit('message', {
    type: 'orderUpdate',
    payload
  });
};

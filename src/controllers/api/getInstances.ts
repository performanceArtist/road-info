import knex from '@root/connection';

export default async (orderId: string) => {
  const instances = await knex('measurements')
    .select('*')
    .where('order_id', orderId);

  return instances;
};

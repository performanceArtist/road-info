import knex from '@root/connection';

type Filters = {
  startDate?: Date;
  endDate?: Date;
  kondor?: string;
};

export default async ({ startDate, endDate, kondor }: Filters) => {
  const query = knex('orders')
    .select('*')
    .limit(10);

  startDate && query.where('date', '>=', startDate);
  endDate && query.where('date', '<', endDate);
  kondor && query.where({ kondor_id: kondor });

  const orders = await query;
  const ids = orders.map(({ id }: { id: string }) => id);
  const instances = await knex('measurements')
    .select('*')
    .whereIn('order_id', ids);

  return { orders, instances };
};

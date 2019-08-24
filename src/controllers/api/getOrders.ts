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
  return orders;
};

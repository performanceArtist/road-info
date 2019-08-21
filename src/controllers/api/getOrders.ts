import knex from '@root/connection';

type Filters = {
  startDate?: Date;
  endDate?: Date;
  kondor?: string;
};

export default async ({ startDate, endDate, kondor }: Filters) => {
  /*
  const filterObject = (object: { [key: string]: any }) =>
    Object.keys(object).reduce((acc: { [key: string]: any }, key) => {
      if (object[key]) acc[key] = object[key];
      return acc;
    }, {});

  const filters = filterObject(req.query);*/

  const query = knex('orders')
    .select('*')
    .limit(10);

  startDate && query.where('date', '>=', startDate);
  endDate && query.where('date', '<', endDate);
  kondor && query.where({ kondor_id: kondor });

  const orders = await query;
  const ids = orders.map(({ id }) => id);
  const instances = await knex('measurements')
    .select('*')
    .whereIn('order_id', ids);

  return { orders, instances };
};

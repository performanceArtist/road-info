import knex from '@root/connection';

type Filters = {
  startDate?: Date;
  endDate?: Date;
  condor?: string;
};

export default async ({ startDate, endDate, condor }: Filters) => {
  const query = knex('orders')
    .select('*')
    .limit(10);

  startDate && query.where('date', '>=', startDate);
  endDate && query.where('date', '<', endDate);
  condor && query.where({ condor_id: condor });

  const orders = await query;
  return orders;
};

import { Tasks } from '@redux/task/types';
import { Measurements } from '@redux/measurements/types';

export type Filters = {
  kondor: number | string;
  startDate: Date;
  endDate: Date;
};

export type History = {
  tasks: Array<Tasks>;
  instances: { [key: string]: any };
  measurements: Array<Measurements>;
  fetching: boolean;
  filters: Filters;
};

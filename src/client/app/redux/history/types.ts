import { Tasks } from '@redux/task/types';
import { Measurements } from '@redux/measurements/types';

export type Filters = {
  kondor: number | string;
  startDate: Date;
  endDate: Date;
};

export type History = {
  tasks: Array<Tasks>;
  measurements: Measurements;
  fetching: boolean;
  filters: Filters;
};

export type Task = {
  id: number;
  order: string;
  status: 'ready' | 'taken' | 'done';
  start: number;
  finish: number;
  forward: boolean;
  backward: boolean;
  isForward: boolean;
  lanesCount: number;
  description: string | null;
  lane?: number;
  condor: string | null;
  roadPartName: string;
  street: string;
  streetId: string;
  settlement: string;
  settlementId: string;
  city: string;
  cityId: string;
  regionId: string;
  region: string;
};

export type TaskInstance = {
  status: 'ready' | 'taken' | 'done';
  isForward: boolean;
  lane: number;
  condor: string;
  date: Date;
};

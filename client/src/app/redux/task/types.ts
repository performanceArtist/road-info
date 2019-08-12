export type Task = {
  id: number;
  start: number;
  finish: number;
  direction: 'forward' | 'backward';
  lane: number;
  lanesCount: number;
  description: string | null;
  kondor: string | null;
  partName: string;
  roadName: string;
  city: string;
  region: string;
};

export type Tasks = Array<Task>;

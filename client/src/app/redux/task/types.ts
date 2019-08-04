export type Task = {
  id: number;
  start: number;
  finish: number;
  lane: number;
  lanesCount: number;
  description: string | null;
  kondor: string;
  partName: string;
  roadName: string;
  city: string;
  region: string;
};

export type Tasks = Array<Task>;

import { GPSTrack } from '@shared/types';

import { UserInfo } from './user';
import { GPSCoordinates } from './gps';

export type TaskStatus = 'ready' | 'taken' | 'done' | 'cancelled';
export type RoadClass = 'Автомагистраль' | 'Скоростная' | 'Обычная';
export type RoadCategory = 'IA' | 'IБ' | 'IB' | 'I' | 'II' | 'III' | 'IV' | 'V';

export type ServerTask = {
  id: number;
  order_number: string;
  date: Date;
  current_position: GPSCoordinates;
  route: GPSTrack;
  distance: [number, number];
  is_direction_forward: boolean;
  description: string;
  lane_number: number;
  status: TaskStatus;
  road_class: RoadClass;
  road_category: RoadCategory;
  company: string;
  condor: number;
  user: UserInfo;
};

export type TaskFormData = {
  from: string;
  to: string;
  user: string;
  category: string;
  condor: string;
  company: string;
  direction: 'forward' | 'backward';
  routePoints: GPSTrack;
};

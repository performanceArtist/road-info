import * as React from 'react';
import L from 'leaflet';
import { Popup } from 'react-leaflet';

import { Task } from '@redux/task/types';

type Props = {
  position: L.LatLng;
  task: Task;
  taskId: string;
};

const InfoPopup: React.FC<Props> = ({ position, task, taskId }) => {
  return (
    <Popup className="info-popup" position={position}>
      <div className="info-popup__wrapper">Заказ #{taskId}</div>
    </Popup>
  );
};

export default InfoPopup;

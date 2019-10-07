import * as React from 'react';

import MiniTable from '@shared/view/MiniTable/MiniTable';
import { PointData } from '@shared/types';

type Props = {
  coordinates: { x: number; y: number };
  diffs: PointData[];
};

const RoadPopup: React.FC<Props> = ({ coordinates: { x, y }, diffs }) => {
  return (
    <div className="road-popup" style={{ left: x, top: y }}>
      <div className="road-popup__wrapper">
        {diffs.length === 0 ? 'Параметры в норме' : <MiniTable diffs={diffs} />}
      </div>
    </div>
  );
};

export default RoadPopup;

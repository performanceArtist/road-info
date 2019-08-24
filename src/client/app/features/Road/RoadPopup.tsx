import * as React from 'react';

import MiniTable from '@components/MiniTable/MiniTable';
import { PointData } from '@features/Map/MapPopup';

type Props = {
  coordinates: { x: number; y: number };
  diffs: PointData;
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

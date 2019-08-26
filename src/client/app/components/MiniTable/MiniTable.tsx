import * as React from 'react';

import { PointData } from '@features/Map/MapPopup';

type Props = {
  diffs: PointData;
};

const MiniTable: React.FC<Props> = ({ diffs }) => {
  const rows = diffs.map(({ name, value, difference }) => {
    const diffString =
      difference > 0 ? '+' + difference.toFixed(2) : difference.toFixed(2);

    return (
      <div className="mini-table__row" key={name}>
        <span className="mini-table__row-name">{name}:</span>
        <span className="mini-table__numbers">
          {value.toFixed(2)}(
          <span className="mini-table__difference">{diffString}</span>)
        </span>
      </div>
    );
  });

  return <div className="mini-table">{rows}</div>;
};

export default MiniTable;

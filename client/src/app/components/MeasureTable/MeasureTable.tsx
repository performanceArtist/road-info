import React from 'react';

import uuid from 'short-uuid';

const MeasureTable = ({ measures }) => {
  const rows = measures.map(({ name, value, unit }) => (
    <div className="measure-table__measure" key={uuid.generate()}>
      <div className="measure-table__name">{name}</div>
      <div className="measure-table__value">{value}</div>
      <div className="measure-table__unit">{unit}</div>
    </div>
  ));

  return (
    <div className="measure-table">
      <div className="measure-table__wrapper">{rows}</div>
    </div>
  );
};

export default MeasureTable;

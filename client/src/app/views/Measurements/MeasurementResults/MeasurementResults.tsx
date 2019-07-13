import React from 'react';
import uuid from 'short-uuid';

interface Measurement {
  title: string;
  min: number;
  average: number;
  max: number;
}

interface Props {
  measurements?: Array<Measurement>;
}

const MeasurementResults: React.SFC<Props> = ({
  measurements = []
}) => {
  const round = (value: number) => Math.round(value * 1000) / 1000;
  const rows = measurements.map(({ title, min, average, max }) => (
    <div className="measurement-results__measurement" key={uuid.generate()}>
      <div className="measurement-results__title">{title}</div>
      <div className="measurement-results__row">
        <div className="measurement-results__row-cell">
          <div className="measurement-results__row-title">Минимум</div>
          <div className="measurement-results__row-item">{round(min)}</div>
        </div>
        <div className="measurement-results__row-cell">
          <div className="measurement-results__row-title">Среднее</div>
          <div className="measurement-results__row-item">{round(average)}</div>
        </div>
        <div className="measurement-results__row-cell">
          <div className="measurement-results__row-title">Максимум</div>
          <div className="measurement-results__row-item">{round(max)}</div>
        </div>
      </div>
    </div>
  ));

  return (
    <div className="measurement-results">
      <div className="measurement-results__wrapper">{rows}</div>
    </div>
  );
};

export default MeasurementResults;

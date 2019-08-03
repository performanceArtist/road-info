import React from 'react';

type Props = { [key: string]: string | number };

const MeasurementInfo: React.FC<Props> = ({
  description,
  start,
  finish,
  lane,
  kondor,
  roadName
}) => (
  <div className="measurement-info">
    {description && (
      <div className="measurement-info__description">{description}</div>
    )}
    <div>Test</div>
  </div>
);

export default MeasurementInfo;

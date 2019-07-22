import React from 'react';

type Props = {
  value: number;
  cx: number;
  cy: number;
  max?: number;
  min?: number;
};

const CustomDot: React.FC<Props> = ({
  cx,
  cy,
  value,
  max = null,
  min = null
}) => {
  const icon = (image: string) => (
    <svg x={cx - 15} y={cy - 15} width={60} height={60} viewBox="0 0 1024 1024">
      <image xlinkHref={image} x="0" y="0" />
    </svg>
  );

  if (value === max) return icon('images/max.png');
  if (value === min) return icon('images/min.png');
  return null;
};

export default CustomDot;

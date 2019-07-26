import React, { useEffect } from 'react';

import { ChartLineInfo } from '@redux/measurements/types';

type Props = {
  keyX: string;
  data: Array<{ [key: string]: number }>;
  info: { [key: string]: ChartLineInfo };
};

const RTest: React.FC<Props> = ({ keyX, data, info }) => {
  const canvasRef = React.useRef(null);
  const config = {
    width: 600,
    height: 400,
    lineGap: 30,
    lineHeight: 30,
    fragmentWidth: 50
  };

  const { width, fragmentWidth } = config;
  const max = width / fragmentWidth;
  const start = data.length - max < 0 ? 0 : data.length - max;
  const filteredData = data.slice(start);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#f4f4f4';
    ctx.fillRect(0, 0, config.width, config.height);
    filteredData.forEach((item, index) => draw(ctx, item, index));
  });

  const draw = (
    ctx: CanvasRenderingContext2D,
    item: { [key: string]: number },
    index: number
  ) => {
    Object.keys(item).forEach((key, keyIndex) => {
      if (key === keyX) return;

      const lineInfo = info[key];
      const isValid = (
        breakpoint: { start: number; finish: number } | null,
        value: number
      ) =>
        breakpoint
          ? value > breakpoint.start && value < breakpoint.finish
          : true;

      ctx.fillStyle = isValid(lineInfo.breakpoint, item[key])
        ? lineInfo.mainColor
        : '#f62a00';

      const { fragmentWidth, lineGap, lineHeight, width, height } = config;

      ctx.fillRect(
        index * fragmentWidth,
        keyIndex * (lineGap + lineHeight),
        fragmentWidth,
        lineHeight
      );

      if (index === 0) {
        ctx.fillStyle = 'black';
        ctx.font = '14px Arial';
        ctx.fillText(`${filteredData[index][keyX]} м`, 10, 40);

        ctx.fillStyle = 'black';
        ctx.fillRect(index * fragmentWidth, 20, 3, height - 40);
      }

      if (index === filteredData.length - 1) {
        ctx.fillStyle = '#545454';
        ctx.fillRect(
          (index + 1) * fragmentWidth,
          keyIndex * (lineGap + lineHeight),
          width - keyIndex * lineGap,
          lineHeight
        );

        if (filteredData.length > 1) {
          ctx.fillStyle = 'black';
          ctx.font = '14px Arial';
          ctx.fillText(
            `${filteredData[filteredData.length - 1][keyX]} м`,
            (index + 1) * fragmentWidth - 55,
            40
          );
        }

        ctx.fillStyle = 'black';
        ctx.fillRect((index + 1) * fragmentWidth - 3, 20, 3, height - 40);
      }
    });
  };

  return (
    <canvas
      ref={canvasRef}
      width={config.width}
      height={config.height}
      onClick={e => {
        const newLocation = { x: e.clientX, y: e.clientY };
        console.log(newLocation);
      }}
    />
  );
};

export default RTest;

import React, { useEffect, useState } from 'react';

import Popup from '@components/Popup/Popup';

import { ChartLineInfo } from '@redux/measurements/types';

type Props = {
  keyX: string;
  data: Array<{ [key: string]: number }>;
  info: { [key: string]: ChartLineInfo };
};

const RoadChart: React.FC<Props> = ({ keyX, data, info }) => {
  const canvasRef = React.useRef(null);
  const config = {
    width: 600,
    height: 400,
    lineGap: 15,
    lineHeight: 40,
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

  const [popup, setPopup] = useState(null);

  const isValid = (
    breakpoint: { start: number; finish: number } | null,
    value: number
  ) =>
    breakpoint ? value > breakpoint.start && value < breakpoint.finish : true;

  const draw = (
    ctx: CanvasRenderingContext2D,
    item: { [key: string]: number },
    index: number
  ) => {
    Object.keys(item).forEach((key, keyIndex) => {
      if (key === keyX) return;

      const lineInfo = info[key];

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

        if (filteredData.length > 2) {
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

  const createPopup = (event: React.MouseEvent) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    const target = event.target as HTMLElement;
    const { left, top } = target.getBoundingClientRect();

    const x = mouseX - left;
    const y = mouseY - top;

    const { fragmentWidth, lineGap, lineHeight } = config;

    const result = Object.keys(filteredData[0]).reduce((acc, key, keyIndex) => {
      if (key === keyX) return null;
      if (acc) return acc;

      const rx = 0;
      const ry = keyIndex * (lineGap + lineHeight);
      const rxw = fragmentWidth * filteredData.length;
      const ryh = ry + lineHeight;

      if (x > rx && x < rxw && y > ry && y < ryh) {
        const index = Math.floor((filteredData.length * x) / rxw);

        const valid = isValid(info[key].breakpoint, filteredData[index][key]);
        return { error: !valid, key, value: filteredData[index][key] };
      } else {
        return null;
      }
    }, null);

    if (!result) {
      setPopup(null);
      return;
    }

    const { error, key, value } = result;
    if (!error) {
      setPopup({
        coordinates: { x: mouseX - 80, y: mouseY - 75 + window.scrollY },
        error: false,
        message: 'Параметры в норме'
      });
      return;
    }
    const { breakpoint, name, units } = info[key];
    const message =
      value < breakpoint.start
        ? `Отклонение от нормы: ${name} меньше эталона на ${(
            breakpoint.start - value
          ).toFixed(2)}${units}`
        : `Отклонение от нормы: ${name} превышет эталон на ${(
            value - breakpoint.finish
          ).toFixed(2)}${units}`;

    setPopup({
      coordinates: { x: mouseX - 80, y: mouseY - 75 + window.scrollY },
      error: true,
      message
    });
  };

  const charInfo = Object.keys(data[0]).map(key => {
    if (key === keyX) return null;

    return (
      <div className="road-chart__info-item">{`${info[key].name}, ${
        info[key].units
      }`}</div>
    );
  });

  return (
    <div className="road-chart">
      <div className="road-chart__info">{charInfo}</div>
      <div className="road-chart__chart">
        {popup && (
          <Popup coordinates={popup.coordinates} error={popup.error}>
            {popup.message}
          </Popup>
        )}
        <canvas
          className="road-chart"
          ref={canvasRef}
          width={config.width}
          height={config.height}
          onClick={createPopup}
        />
      </div>
      <div />
    </div>
  );
};

export default RoadChart;

import React, { useEffect, useState } from 'react';

import Popup from '@components/Popup/Popup';

import { ChartLineInfo } from '@redux/measurements/types';

type Config = {
  width?: number;
  height?: number;
  rectGap?: number;
  rectHeight?: number;
  lineWidth?: number;
  fragmentWidth?: number;
  background?: string;
  dangerColor?: string;
  lineColor?: string;
  remainderColor?: string;
  textColor?: string;
  textFont?: string;
  textSize?: string;
};

type Props = {
  keyX: string;
  xUnits: string;
  data: Array<{ [key: string]: number }>;
  info: { [key: string]: ChartLineInfo };
  config?: Config;
};

const RoadChart: React.FC<Props> = ({
  keyX,
  xUnits,
  data,
  info,
  config = {}
}) => {
  const canvasRef = React.useRef(null);
  config = {
    width: 600,
    height: 400,
    background: '#f4f4f4',
    rectGap: 30,
    rectHeight: 40,
    lineWidth: 3,
    fragmentWidth: 50,
    remainderColor: '#545454',
    dangerColor: '#f62a00',
    lineColor: 'black',
    textColor: 'black',
    textSize: '14px',
    textFont: 'Arial',
    ...config
  };

  const { width, fragmentWidth } = config;
  const max = width / fragmentWidth;
  const start = data.length - max < 0 ? 0 : data.length - max;
  const filteredData = data.slice(start);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = config.background;
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
        : config.dangerColor;

      const {
        width,
        height,
        fragmentWidth,
        rectGap,
        rectHeight,
        lineWidth,
        lineColor,
        textColor,
        textSize,
        textFont,
        remainderColor
      } = config;

      ctx.fillRect(
        index * fragmentWidth,
        height / 25 + keyIndex * (rectGap + rectHeight),
        fragmentWidth,
        rectHeight
      );

      if (index === 0) {
        ctx.fillStyle = textColor;
        ctx.font = `${textSize} ${textFont}`;
        ctx.fillText(
          `${filteredData[index][keyX]} ${xUnits}`,
          lineWidth + 10,
          height / 10
        );

        ctx.fillStyle = lineColor;
        ctx.fillRect(
          index * fragmentWidth,
          height / 25,
          lineWidth,
          (height / 25) * 23
        );
      }

      if (index === filteredData.length - 1) {
        ctx.fillStyle = remainderColor;
        ctx.fillRect(
          (index + 1) * fragmentWidth,
          height / 25 + keyIndex * (rectGap + rectHeight),
          width - keyIndex * rectGap,
          rectHeight
        );

        if (filteredData.length > 2) {
          ctx.fillStyle = lineColor;
          ctx.font = `${textSize} ${textFont}`;
          ctx.fillText(
            `${filteredData[filteredData.length - 1][keyX]} ${xUnits}`,
            index * fragmentWidth - lineWidth,
            height / 10
          );
        }

        ctx.fillStyle = lineColor;
        ctx.fillRect(
          (index + 1) * fragmentWidth - lineWidth,
          height / 25,
          lineWidth,
          (height / 25) * 23
        );
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

    const { fragmentWidth, rectGap, rectHeight } = config;

    const result = Object.keys(filteredData[0]).reduce((acc, key, keyIndex) => {
      if (key === keyX) return null;
      if (acc) return acc;

      const rx = 0;
      const ry = keyIndex * (rectGap + rectHeight);
      const rxw = fragmentWidth * filteredData.length;
      const ryh = ry + rectHeight;

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

    const { error, key, value } = result as {
      error: boolean;
      key: string;
      value: number;
    };

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
      <div
        className="road-chart__info-item"
        style={{
          height: config.rectHeight,
          lineHeight: `${config.rectHeight}px`,
          marginBottom: config.rectGap
        }}
      >{`${info[key].name}, ${info[key].units}`}</div>
    );
  });

  return (
    <div className="road-chart">
      <div
        className="road-chart__info"
        style={{
          marginTop: config.height / 25 + config.rectGap + config.rectHeight
        }}
      >
        {charInfo}
      </div>
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

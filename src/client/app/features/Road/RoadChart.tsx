import * as React from 'react';
import { useEffect, useState } from 'react';
import * as R from 'ramda';

import Popup from '@components/Popup/Popup';

import {
  MeasurementInstances,
  MeasurementData
} from '@redux/measurements/types';
import { ChartInfo } from '@redux/chart/types';

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
  title?: string;
  keyX: string;
  xUnits: string;
  data: MeasurementInstances;
  chartInfo: ChartInfo;
  userConfig?: Config;
  positionIndex?: number;
};

const RoadChart: React.FC<Props> = ({
  title = '',
  keyX,
  xUnits,
  data,
  chartInfo,
  userConfig = {},
  positionIndex = 1
}) => {
  const canvasRef = React.useRef(null);
  const containerRef = React.useRef(null);
  const lengths = Object.keys(data).map(key => data[key].length);
  const maxLength = Math.max(...lengths);

  const config = {
    width: maxLength * 50,
    maxWidth: 900,
    height: 600,
    background: '#f4f4f4',
    rectGap: 30,
    rectHeight: 80,
    lineWidth: 3,
    fragmentWidth: 50,
    remainderColor: '#545454',
    dangerColor: '#f62a00',
    lineColor: 'black',
    textColor: 'black',
    textSize: '14px',
    textFont: 'Arial',
    ...userConfig
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    containerRef.current.scrollTo(
      (positionIndex / maxLength) * config.maxWidth,
      0
    );

    ctx.fillStyle = config.background;
    ctx.fillRect(0, 0, config.width, config.height);
    Object.keys(data).forEach((key, index) => draw(ctx, data[key], index));
  });

  const [popup, setPopup] = useState(null);

  const draw = (
    ctx: CanvasRenderingContext2D,
    data: Array<MeasurementData>,
    laneIndex: number
  ) => {
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

    const isValid = (
      breakpoint: { start: number; finish: number } | null,
      value: number
    ) =>
      breakpoint ? value > breakpoint.start && value < breakpoint.finish : true;
    const diff = (item: { [key: string]: number }) =>
      Object.keys(item).reduce((acc, cur) => {
        return isValid(chartInfo.lines[cur].breakpoint, item[cur])
          ? acc
          : acc + 1;
      }, 0);
    const filtered = data.map(
      R.pick(['density', 'thickness', 'iri', 'rutting'])
    );

    filtered.forEach((item, itemIndex) => {
      const diffIndex = diff(item);

      ctx.fillStyle = diffIndex > 0 ? config.dangerColor : '#00ff00';

      ctx.fillRect(
        itemIndex * fragmentWidth,
        height / 25 + laneIndex * (rectGap + rectHeight),
        fragmentWidth,
        rectHeight
      );
    });
  };

  return (
    <div className="road-chart">
      <div className="road-chart__title">{title}</div>
      <div className="road-chart__content">
        <div
          className="road-chart__chart"
          ref={containerRef}
          style={{ maxWidth: config.maxWidth }}
        >
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
          />
        </div>
        <div />
      </div>
    </div>
  );
};

export default RoadChart;

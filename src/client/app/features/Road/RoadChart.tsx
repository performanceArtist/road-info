import * as React from 'react';
import { useEffect, useState } from 'react';
import * as R from 'ramda';

import RoadPopup from './RoadPopup';

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
    containerRef.current.scrollTo(
      (positionIndex / maxLength) * config.maxWidth,
      0
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

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
    const { width, height, fragmentWidth, rectGap, rectHeight } = config;

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

      const getColor = R.cond([
        [R.equals(0), R.always('#5CBD5C')],
        [R.equals(1), R.always('#E3E349')],
        [R.gte(2), R.always('#fc8888')]
      ]);

      ctx.fillStyle = getColor(diffIndex);

      ctx.fillRect(
        itemIndex * fragmentWidth,
        rectGap + laneIndex * (rectGap + rectHeight),
        fragmentWidth,
        rectHeight
      );
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

    const inHeight = (index: number) => {
      const ry = rectGap + index * (rectGap + rectHeight);
      const ryh = ry + rectHeight;

      return y > ry && y < ryh;
    };
    const lane = Object.keys(data).find((key, index) => inHeight(index));
    if (!lane) return setPopup(null);

    const laneData = data[lane];
    const dataLength = laneData.length;
    const rxw = dataLength * fragmentWidth;
    const relative = x / rxw;
    if (relative > 1) return setPopup(null);

    const closestIndex = Math.floor(relative * dataLength);
    const measurement = laneData[closestIndex];
    const filtered = R.pick(
      ['density', 'thickness', 'iri', 'rutting'],
      measurement
    );

    const { lines } = chartInfo;

    const isValid = (point: MeasurementData) => {
      return Object.keys(lines).reduce((acc: PointData, key: string) => {
        const breakpoint = lines[key].breakpoint;
        if (!breakpoint) return acc;

        if (point[key] < breakpoint.start)
          acc.push({
            key,
            name: lines[key].name,
            value: point[key],
            difference: point[key] - breakpoint.start
          });
        if (point[key] > breakpoint.finish)
          acc.push({
            key,
            name: lines[key].name,
            value: point[key],
            difference: point[key] - breakpoint.finish
          });

        return acc;
      }, []);
    };

    setPopup({
      coordinates: { x: mouseX - 80, y: mouseY - 75 + window.scrollY },
      diffs: isValid(measurement)
    });
  };

  return (
    <div className="road-chart">
      <div className="road-chart__title">{title}</div>
      <div className="road-chart__content">
        <div
          className="road-chart__chart"
          ref={containerRef}
          style={{ width: config.maxWidth }}
          onScroll={() => setPopup(null)}
        >
          {popup && <RoadPopup {...popup} />}
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
    </div>
  );
};

export default RoadChart;

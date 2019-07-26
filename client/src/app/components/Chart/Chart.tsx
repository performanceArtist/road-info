import React from 'react';
import uuid from 'short-uuid';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis,
  Brush,
  ReferenceArea
} from 'recharts';

import CustomDot from '@components/CustomDot/CustomDot';
import { Icon, IconImage } from '@components/Icon/Icon';

type DataType = {
  [key: string]: number;
};

type OwnProps = {
  keyX: string;
  keyY: string;
  data: Array<DataType>;
  maxTicks?: number;
  name?: string;
  units?: string;
  breakpoint?: { start: number; finish: number };
  mainColor?: string;
  warningColor?: string;
  showY?: boolean;
  showBrush?: boolean;
  showControls?: boolean;
  showMin?: boolean;
  showMax?: boolean;
  show?: boolean;
  enableZoom?: boolean;
};

type Props = OwnProps;

interface State {
  refAreaLeft: string;
  refAreaRight: string;
  xDomain: { left: string | number; right: string | number };
  yDomain: { top: string | number; bottom: string | number };
  startIndex: number | null;
  endIndex: number;
}

class Chart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      refAreaLeft: '',
      refAreaRight: '',
      xDomain: { left: 'dataMin', right: 'dataMax' },
      yDomain: { top: 'dataMax+0.5', bottom: 'dataMin-0.5' },
      startIndex: null,
      endIndex: null
    };

    this.getAxisYDomain = this.getAxisYDomain.bind(this);
    this.zoom = this.zoom.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.getLineChart = this.getLineChart.bind(this);
    this.getGradients = this.getGradients.bind(this);
    this.getStartIndex = this.getStartIndex.bind(this);
    this.getXTicks = this.getXTicks.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({ startIndex: null, endIndex: this.props.data.length - 1 });
  }

  getAxisYDomain(
    from: string,
    to: string,
    ref: string,
    offset: number
  ): { bottom: number; top: number } {
    const { data, keyX } = this.props;

    const refData = data.filter(item => item[keyX] >= from && item[keyX] <= to);

    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach(axis => {
      if (axis[ref] > top) top = axis[ref];
      if (axis[ref] < bottom) bottom = axis[ref];
    });

    return { bottom: (bottom | 0) - offset, top: (top | 0) + offset };
  }

  zoom() {
    let { refAreaLeft, refAreaRight } = this.state;
    const { keyY } = this.props;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      this.setState({
        refAreaLeft: '',
        refAreaRight: ''
      });
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight)
      [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    this.setState({
      refAreaLeft: '',
      refAreaRight: '',
      xDomain: {
        left: refAreaLeft,
        right: refAreaRight
      },
      yDomain: this.getAxisYDomain(refAreaLeft, refAreaRight, keyY, 1)
    });
  }

  zoomOut() {
    this.setState({
      refAreaLeft: '',
      refAreaRight: '',
      xDomain: { left: 'dataMin', right: 'dataMax' },
      yDomain: { top: 'dataMax+0.5', bottom: 'dataMin-0.5' }
    });
  }

  getLineChart() {
    const {
      data,
      keyY,
      name = keyY,
      units = '',
      breakpoint = null,
      mainColor = 'black',
      showMax = true,
      showMin = true,
      showY = true
    } = this.props;
    const { yDomain } = this.state;

    const yData = data.map(item => item[keyY]);
    const min = Math.min(...yData);
    const max = Math.max(...yData);

    return [
      <Line
        yAxisId={keyY}
        type="linear"
        name={`${name}, ${units}`}
        dataKey={keyY}
        stroke={breakpoint ? `url(#${keyY})` : mainColor}
        strokeWidth={2.5}
        dot={
          <CustomDot max={showMax ? max : null} min={showMin ? min : null} />
        }
        activeDot={false}
        isAnimationActive={false}
      />,
      <YAxis
        type="number"
        hide={!showY}
        yAxisId={keyY}
        domain={[yDomain.bottom, yDomain.top]}
        allowDataOverflow
      />
    ];
  }

  getGradients() {
    const {
      keyY,
      data,
      breakpoint = null,
      mainColor = 'green',
      warningColor = 'red'
    } = this.props;

    if (!breakpoint) return null;

    const { min, max } = data.reduce(
      (result, dataPoint) => ({
        min:
          dataPoint[keyY] < result.min || result.min === 0
            ? dataPoint[keyY]
            : result.min,
        max:
          dataPoint[keyY] > result.max || result.max === 0
            ? dataPoint[keyY]
            : result.max
      }),
      { min: 0, max: 0 }
    );
    const { start, finish } = breakpoint;
    const startPercentage = (1 - (start - min) / (max - min)) * 100;
    const finishPercentage = (1 - (finish - min) / (max - min)) * 100;
    const out = (number: number) => number >= 100 || number <= 0;
    let stops;

    if (out(startPercentage) && out(finishPercentage)) {
      stops = (
        <>
          <stop offset="0%" stopColor={mainColor} />
          <stop offset="100%" stopColor={mainColor} />
        </>
      );
    } else if (!out(startPercentage) && !out(finishPercentage)) {
      stops = (
        <>
          <stop offset="0%" stopColor={warningColor} />
          <stop offset={`${finishPercentage}%`} stopColor={warningColor} />
          <stop offset={`${finishPercentage}%`} stopColor={mainColor} />
          <stop offset={`${startPercentage}%`} stopColor={mainColor} />
          <stop offset={`${startPercentage}%`} stopColor={warningColor} />
          <stop offset="100%" stopColor={warningColor} />
        </>
      );
    } else if (out(startPercentage)) {
      stops = (
        <>
          <stop offset="0%" stopColor={warningColor} />
          <stop offset={`${finishPercentage}%`} stopColor={warningColor} />
          <stop offset={`${finishPercentage}%`} stopColor={mainColor} />
          <stop offset="100%" stopColor={mainColor} />
        </>
      );
    } else if (out(finishPercentage)) {
      stops = (
        <>
          <stop offset="0%" stopColor={mainColor} />
          <stop offset={`${startPercentage}%`} stopColor={mainColor} />
          <stop offset={`${startPercentage}%`} stopColor={warningColor} />
          <stop offset="100%" stopColor={warningColor} />
        </>
      );
    }

    return (
      <linearGradient
        id={keyY}
        x1="0%"
        y1="0%"
        x2="0%"
        y2="100%"
        key={uuid.generate()}
      >
        {stops}
      </linearGradient>
    );
  }

  getStartIndex() {
    const { data, maxTicks = 10 } = this.props;
    switch (data.length) {
      case 0:
        return 0;
      default:
        const index = data.length - maxTicks;
        return index > 0 ? index : 0;
    }
  }

  getXTicks() {
    const { data, keyX } = this.props;
    const { startIndex, endIndex } = this.state;
    const start = startIndex === null ? this.getStartIndex() : startIndex;
    const partData = data.slice(start, endIndex + 1);
    const autoStep = Math.floor(partData.length / 8);
    const step = autoStep > 0 ? autoStep + 1 : 1;

    const ticks = partData
      .map(item => Math.round(item[keyX] * 100) / 100)
      .filter((distance, index) => index % step === 0);

    return ticks;
  }

  render() {
    const {
      showControls = true,
      showBrush = true,
      enableZoom = true,
      data,
      maxTicks = 10,
      keyX,
      keyY
    } = this.props;
    const {
      refAreaLeft,
      refAreaRight,
      xDomain,
      startIndex,
      endIndex
    } = this.state;

    if (data.length === 0) return null;

    return (
      <>
        <ResponsiveContainer key={`chart-${maxTicks}`}>
          <LineChart
            data={data}
            onMouseDown={event =>
              this.setState({ refAreaLeft: event.activeLabel })
            }
            onMouseMove={event =>
              refAreaLeft && this.setState({ refAreaRight: event.activeLabel })
            }
            onMouseUp={this.zoom}
          >
            <defs>{this.getGradients()}</defs>
            <CartesianGrid stroke="#ccc" />
            <XAxis
              type="number"
              dataKey={keyX}
              domain={[xDomain.left, xDomain.right]}
              interval={0}
              tick={{ fontSize: '0.8rem' }}
              ticks={this.getXTicks()}
              allowDataOverflow
            />
            {this.getLineChart()}
            {data.length > 0 && showBrush && (
              <Brush
                dataKey="distance"
                onChange={({ startIndex, endIndex }) => {
                  this.setState({ startIndex, endIndex });
                }}
                startIndex={
                  startIndex === null ? this.getStartIndex() : startIndex
                }
                endIndex={startIndex ? endIndex : data.length - 1}
                height={15}
                stroke="ccc"
              />
            )}
            <Tooltip />
            <Legend
              wrapperStyle={{
                fontSize: '0.9rem'
              }}
            />

            {enableZoom && refAreaLeft && refAreaRight ? (
              <ReferenceArea
                yAxisId={keyY}
                x1={refAreaLeft}
                x2={refAreaRight}
                strokeOpacity={0.3}
              />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
        {showControls && (
          <div className="chart-controls">
            <Icon
              size="small"
              image={IconImage.ZOOM_OUT}
              onClick={this.zoomOut}
            />
          </div>
        )}
      </>
    );
  }
}

export default Chart;

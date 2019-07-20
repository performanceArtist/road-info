import React from 'react';
import { connect } from 'react-redux';
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

import { Icon, IconImage } from '@components/Icon/Icon';
import { openModal, OpenModal } from '@redux/modal/actions';
import { ChartData, ChartInfo } from '@redux/measurements/types';

type OwnProps = {
  data?: ChartData;
  info?: ChartInfo;
  openModal: OpenModal;
};

type Props = OwnProps & typeof mapDispatch;

interface State {
  refAreaLeft: string;
  refAreaRight: string;
  yDomains: {
    [key: string]: { top: string | number; bottom: string | number };
  };
  xDomains: {
    [key: string]: { left: string | number; right: string | number };
  };
  startIndex: number | null;
  endIndex: number;
}

const yDomains = {
  density: {
    top: 'dataMax+0.5',
    bottom: 'dataMin-0.5'
  },
  thickness: {
    top: 'dataMax+0.5',
    bottom: 'dataMin-0.5'
  },
  rutting: {
    top: 'dataMax+0.5',
    bottom: 'dataMin-0.5'
  },
  iri: {
    top: 'dataMax+0.5',
    bottom: 'dataMin-0.5'
  }
};

const xDomains = {
  distance: { left: 'dataMin', right: 'dataMax' }
};

class DensityChart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      refAreaLeft: '',
      refAreaRight: '',
      yDomains: { ...yDomains },
      xDomains: { ...xDomains },
      startIndex: null,
      endIndex: null
    };

    this.getAxisYDomain = this.getAxisYDomain.bind(this);
    this.zoom = this.zoom.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.getLineCharts = this.getLineCharts.bind(this);
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
    const { data } = this.props;
    const refData = data.filter(
      ({ distance }) => distance >= from && distance <= to
    );

    let [bottom, top] = [refData[0][ref], refData[0][ref]];
    refData.forEach(axis => {
      if (axis[ref] > top) top = axis[ref];
      if (axis[ref] < bottom) bottom = axis[ref];
    });

    return { bottom: (bottom | 0) - offset, top: (top | 0) + offset };
  }

  zoom() {
    let { refAreaLeft, refAreaRight } = this.state;

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
      xDomains: {
        distance: {
          left: refAreaLeft,
          right: refAreaRight
        }
      },
      yDomains: {
        density: this.getAxisYDomain(refAreaLeft, refAreaRight, 'density', 1),
        thickness: this.getAxisYDomain(
          refAreaLeft,
          refAreaRight,
          'thickness',
          1
        ),
        rutting: this.getAxisYDomain(refAreaLeft, refAreaRight, 'rutting', 1),
        iri: this.getAxisYDomain(refAreaLeft, refAreaRight, 'iri', 1)
      }
    });
  }

  zoomOut() {
    this.setState({
      refAreaLeft: '',
      refAreaRight: '',
      xDomains: { ...xDomains },
      yDomains: { ...yDomains }
    });
  }

  getLineCharts() {
    const { info } = this.props;
    const { yDomains } = this.state;

    return Object.keys(info.lines).map(key => {
      if (key !== 'density') return null;
      const { units = 'm', breakpoint, mainColor, show } = info.lines[key];

      return [
        <Line
          yAxisId={key}
          type="linear"
          name={units}
          dataKey={key}
          stroke={breakpoint ? `url(#${key})` : mainColor}
          strokeWidth={2.5}
          dot={false}
          activeDot={false}
          isAnimationActive={false}
          hide={!show}
        />,
        <YAxis
          type="number"
          yAxisId={key}
          ticks={[1, 2, 3, 4]}
          domain={[yDomains[key].bottom, yDomains[key].top]}
          allowDataOverflow
        />
      ];
    });
  }

  getGradients() {
    const { data, info } = this.props;

    return Object.keys(info.lines).map(key => {
      const {
        breakpoint = null,
        mainColor = 'green',
        warningColor = 'red'
      } = info.lines[key];

      if (!breakpoint) return null;

      const { min, max } = data.reduce(
        (result, dataPoint) => ({
          min:
            dataPoint[key] < result.min || result.min === 0
              ? dataPoint[key]
              : result.min,
          max:
            dataPoint[key] > result.max || result.max === 0
              ? dataPoint[key]
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
            <stop offset="0%" stopColor={warningColor} />
            <stop offset={`${startPercentage}%`} stopColor={warningColor} />
            <stop offset={`${startPercentage}%`} stopColor={mainColor} />
            <stop offset="100%" stopColor={mainColor} />
          </>
        );
      }

      return (
        <linearGradient
          id={key}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          key={uuid.generate()}
        >
          {stops}
        </linearGradient>
      );
    });
  }

  getStartIndex() {
    const { data, info } = this.props;
    switch (data.length) {
      case 0:
        return 0;
      default:
        const index = data.length - info.maxTicks;
        return index > 0 ? index : 0;
    }
  }

  getXTicks() {
    const { data } = this.props;
    const { startIndex, endIndex } = this.state;
    const start = startIndex === null ? this.getStartIndex() : startIndex;
    const partData = data.slice(start, endIndex + 1);
    const autoStep = Math.floor(partData.length / 8);
    const step = autoStep > 0 ? autoStep + 1 : 1;

    const ticks = partData
      .map(({ distance }) => distance)
      .filter((distance, index) => index % step === 0);

    return ticks;
  }

  render() {
    const { data, info, openModal } = this.props;
    const {
      refAreaLeft,
      refAreaRight,
      xDomains,
      startIndex,
      endIndex
    } = this.state;
    const { distance } = xDomains;

    return (
      <>
        <ResponsiveContainer key={`chart-${info.maxTicks}`}>
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
              dataKey="distance"
              domain={[distance.left, distance.right]}
              interval={0}
              tick={{ fontSize: '0.8rem' }}
              ticks={this.getXTicks()}
              allowDataOverflow
            />
            {this.getLineCharts()}
            {data.length > 0 && (
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

            {refAreaLeft && refAreaRight ? (
              <ReferenceArea
                yAxisId="density"
                x1={refAreaLeft}
                x2={refAreaRight}
                strokeOpacity={0.3}
              />
            ) : null}
          </LineChart>
        </ResponsiveContainer>
        <div className="chart-controls">
          <Icon
            size="small"
            image={IconImage.ZOOM_OUT}
            onClick={this.zoomOut}
          />
        </div>
      </>
    );
  }
}

const mapDispatch = { openModal };

export default connect(
  null,
  mapDispatch
)(DensityChart);

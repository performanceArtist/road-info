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
import { openModal } from '@redux/modal/actions';
import { ChartData, ChartInfo } from '@redux/measurements/types';

interface Props {
  data?: Array<ChartData>;
  info?: ChartInfo;
}

interface State {
  refAreaLeft: string;
  refAreaRight: string;
  domains: { [key: string]: { top: string; bottom: string } };
  startIndex: null | number;
}

const initialDomains = {
  distance: { left: 'dataMin', right: 'dataMax' },
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

class DensityChart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      refAreaLeft: '',
      refAreaRight: '',
      domains: { ...initialDomains },
      startIndex: null
    };

    this.getAxisYDomain = this.getAxisYDomain.bind(this);
    this.zoom = this.zoom.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.getLineCharts = this.getLineCharts.bind(this);
    this.getGradients = this.getGradients.bind(this);
    this.getStartIndex = this.getStartIndex.bind(this);
  }

  getAxisYDomain(from, to, ref, offset) {
    const { data } = this.props;
    const refData = data.filter(
      ({ distance }) => distance >= from && distance <= to
    );
    let [bottom, top] = [refData[0][ref], refData[0][ref]];

    refData.forEach(d => {
      if (d[ref] > top) top = d[ref];
      if (d[ref] < bottom) bottom = d[ref];
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
      domains: {
        distance: {
          left: refAreaLeft,
          right: refAreaRight
        },
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
      domains: { ...initialDomains }
    });
  }

  getLineCharts() {
    const { info } = this.props;
    const { domains } = this.state;

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
          strokeWidth={2}
          dot={false}
          activeDot={false}
          isAnimationActive={false}
          hide={!show}
        />,
        <YAxis
          type="number"
          yAxisId={key}
          domain={[domains[key].bottom, domains[key].top]}
          allowDataOverflow
          hide
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
      const startPercentage = `${(1 - (start - min) / (max - min)) * 100}%`;
      const finishPercentage = `${(1 - (finish - min) / (max - min)) * 100}%`;

      return (
        <linearGradient
          id={key}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
          key={uuid.generate()}
        >
          <stop offset="0%" stopColor={warningColor} />
          <stop offset={startPercentage} stopColor={mainColor} />
          <stop offset={finishPercentage} stopColor={mainColor} />
          <stop offset="100%" stopColor={warningColor} />
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

  render() {
    const { data, openModal } = this.props;
    const { refAreaLeft, refAreaRight, domains, startIndex } = this.state;
    const { distance } = domains;

    return (
      <>
        <ResponsiveContainer key={uuid.generate()}>
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
              interval="preserveStartEnd"
              tick={{ fontSize: '0.8rem' }}
              allowDataOverflow
            />
            {this.getLineCharts()}
            <Brush
              dataKey="distance"
              onChange={index => {
                const { startIndex } = index;
                this.setState({ startIndex });
              }}
              startIndex={startIndex || this.getStartIndex()}
              height={15}
              stroke="ccc"
            />
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
          <Icon
            size="small"
            image={IconImage.SETTINGS}
            onClick={() => openModal('Chart', { counter: 1 })}
          />
        </div>
      </>
    );
  }
}

export default connect(
  null,
  { openModal }
)(DensityChart);

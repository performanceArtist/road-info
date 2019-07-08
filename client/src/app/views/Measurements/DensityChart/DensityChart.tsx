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
import { Icon, IconImage } from '@components/Icon/Icon';

export interface DensityChartData {
  distance: number;
  thickness: number;
  density: number;
  iri: number;
  rutting: number;
}

export interface DensityChartInfo {
  name: string;
  units?: string;
  breakpoint?: { start: number; finish: number };
  mainColor?: string;
  warningColor?: string;
}

interface DensityChartProps {
  data?: Array<DensityChartData>;
  info?: Array<DensityChartInfo>;
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

class DensityChart extends React.Component<DensityChartProps> {
  constructor(props) {
    super(props);

    this.state = {
      refAreaLeft: '',
      refAreaRight: '',
      domains: { ...initialDomains }
    };

    this.getAxisYDomain = this.getAxisYDomain.bind(this);
    this.zoom = this.zoom.bind(this);
    this.zoomOut = this.zoomOut.bind(this);
    this.getLineCharts = this.getLineCharts.bind(this);
    this.getGradients = this.getGradients.bind(this);
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

    return info.map(({ name, units = 'm', breakpoint, mainColor, show }) => {
      return [
        <Line
          yAxisId={name}
          type="linear"
          name={units}
          dataKey={name}
          stroke={breakpoint ? `url(#${name})` : mainColor}
          strokeWidth={2}
          dot={false}
          activeDot={false}
          isAnimationActive={false}
          hide={!show}
        />,
        <YAxis
          type="number"
          yAxisId={name}
          domain={[domains[name].bottom, domains[name].top]}
          allowDataOverflow
          hide
        />
      ];
    });
  }

  getGradients() {
    const { data, info } = this.props;

    return info.map(
      ({
        name = '',
        breakpoint = null,
        mainColor = 'green',
        warningColor = 'red'
      }) => {
        if (!breakpoint) return null;

        const { min, max } = data.reduce(
          (result, dataPoint) => ({
            min:
              dataPoint[name] < result.min || result.min === 0
                ? dataPoint[name]
                : result.min,
            max:
              dataPoint[name] > result.max || result.max === 0
                ? dataPoint[name]
                : result.max
          }),
          { min: 0, max: 0 }
        );
        const { start, finish } = breakpoint;
        const startPercentage = `${(1 - (start - min) / (max - min)) * 100}%`;
        const finishPercentage = `${(1 - (finish - min) / (max - min)) * 100}%`;

        return (
          <linearGradient
            id={name}
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
      }
    );
  }

  render() {
    const { data } = this.props;
    const { refAreaLeft, refAreaRight, domains } = this.state;
    const { distance } = domains;

    return (
      <>
        <ResponsiveContainer>
          <LineChart
            data={data}
            onMouseDown={event =>
              this.setState({ refAreaLeft: event.activeLabel })
            }
            onMouseMove={event =>
              this.state.refAreaLeft &&
              this.setState({ refAreaRight: event.activeLabel })
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
            <Tooltip />
            <Legend
              wrapperStyle={{
                fontSize: '0.9rem'
              }}
            />
            <Brush dataKey="distance" height={15} stroke="ccc" />
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

export default DensityChart;

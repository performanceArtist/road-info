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
import Button from '@shared/Button/Button';

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
    top: 'dataMax+0.1',
    bottom: 'dataMin-0.1'
  },
  thickness: {
    top: 'dataMax+0.1',
    bottom: 'dataMin-0.1'
  },
  rutting: {
    top: 'dataMax+0.1',
    bottom: 'dataMin-0.1'
  },
  iri: {
    top: 'dataMax+0.1',
    bottom: 'dataMin-0.1'
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
    const { data } = this.props;

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
        density: this.getAxisYDomain(refAreaLeft, refAreaRight, 'density', 0.1),
        thickness: this.getAxisYDomain(
          refAreaLeft,
          refAreaRight,
          'thickness',
          0.1
        ),
        rutting: this.getAxisYDomain(refAreaLeft, refAreaRight, 'rutting', 0.1),
        iri: this.getAxisYDomain(refAreaLeft, refAreaRight, 'iri', 0.1)
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

    return info.map(({ name, units = 'm', show }) => {
      if (!show) return null;
      return [
        <Line
          yAxisId={name}
          type="linear"
          name={units}
          dataKey={name}
          stroke={`url(#${name})`}
          strokeWidth={2}
          dot={false}
          activeDot={false}
          isAnimationActive={false}
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
        breakpoint = { start: 1, finish: 2 },
        mainColor = 'green',
        warningColor = 'red'
      }) => {
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
            <stop offset="0%" stopColor={mainColor} />
            <stop offset={startPercentage} stopColor={mainColor} />
            <stop offset={startPercentage} stopColor={warningColor} />
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
            {/*<Brush dataKey="distance" height={15} stroke="ccc" />*/}
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
        <Button onClick={this.zoomOut}>Zoom Out</Button>
      </>
    );
  }
}

export default DensityChart;

import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea
} from 'recharts';

import Button from '@shared/Button/Button';

const initialDomains = {
  distance: { left: 'dataMin', right: 'dataMax' },
  density: {
    top: 'dataMax+0.5',
    bottom: 'dataMin-0.5'
  },
  thickness: {
    top: 'dataMax+0.5',
    bottom: 'dataMin-0.5'
  }
};

export default class Example extends React.Component {
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

    // yAxis domain
    const { bottom, top } = this.getAxisYDomain(
      refAreaLeft,
      refAreaRight,
      'density',
      1
    );
    const { bottom2, top2 } = this.getAxisYDomain(
      refAreaLeft,
      refAreaRight,
      'thickness',
      1
    );

    this.setState({
      refAreaLeft: '',
      refAreaRight: '',
      domains: {
        distance: {
          left: refAreaLeft,
          right: refAreaRight
        },
        density: {
          bottom,
          top
        },
        thickness: {
          bottom: bottom2,
          top: top2
        }
      }
    });
  }

  zoomOut() {
    this.setState(() => ({
      refAreaLeft: '',
      refAreaRight: '',
      domains: { ...initialDomains }
    }));
  }

  render() {
    const { refAreaLeft, refAreaRight, domains } = this.state;
    const { distance, density, thickness } = domains;

    const { data } = this.props;

    return (
      <div className="highlight-bar-charts" style={{ userSelect: 'none' }}>
        <Button onClick={this.zoomOut.bind(this)}>Zoom Out</Button>

        <LineChart
          width={800}
          height={400}
          data={data}
          onMouseDown={e => this.setState({ refAreaLeft: e.activeLabel })}
          onMouseMove={e =>
            this.state.refAreaLeft &&
            this.setState({ refAreaRight: e.activeLabel })
          }
          onMouseUp={this.zoom}
        >
          <CartesianGrid />
          <XAxis
            allowDataOverflow
            dataKey="distance"
            domain={[distance.left, distance.right]}
            type="number"
          />
          <YAxis
            allowDataOverflow
            domain={[density.bottom, density.top]}
            type="number"
            yAxisId="density"
            hide
          />
          <YAxis
            allowDataOverflow
            domain={[thickness.bottom, thickness.top]}
            type="number"
            yAxisId="thickness"
            hide
          />
          <Tooltip />
          <Line
            yAxisId="density"
            type="linear"
            dataKey="density"
            stroke="#8884d8"
            isAnimationActive={false}
          />
          <Line
            yAxisId="thickness"
            type="linear"
            dataKey="thickness"
            stroke="#82ca9d"
            isAnimationActive={false}
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
      </div>
    );
  }
}

import React from 'react';

import TabContainer from '@components/TabContainer/TabContainer';
import Chart from '@components/Chart/Chart';

type Info = {
  title: string;
  value: number | string;
  valid: boolean;
};

type DeviceTab = {
  title: string;
  info: Array<Info>;
  chartData: Array<Object>;
};

type Props = {
  title: string;
  hasError: boolean;
  tabs: Array<DeviceTab>;
};

const data = [
  { name: 1, uv: 3.2 },
  { name: 2, uv: 5.2 },
  { name: 3, uv: 6.6 },
  { name: 4, uv: 3 },
  { name: 5, uv: 4.2 },
  { name: 6, uv: 5 }
];

const DeviceInfo: React.FC<Props> = ({ title, hasError, tabs }) => {
  const getInfo = ({ title, value, valid }: Info) => (
    <div
      className={
        valid
          ? 'device-info__info-item'
          : 'device-info__info-item device-info__info-item_invalid'
      }
    >
      <span className="device-info__info-title">{title}</span>
      <span className="device-info__info-value">{value}</span>
    </div>
  );

  const getChart = ({ keyX, keyY, data }) => (
    <Chart
      keyX={keyX}
      keyY={keyY}
      data={data}
      showMax={false}
      showMin={false}
      showBrush={false}
      showControls={false}
      enableZoom={false}
      units="Напряжение, В"
    />
  );

  const tabEls = tabs.map(({ title, info, chartData }) => (
    <div tab={title} className="device-info__tab-content">
      <div className="device-info__tab-info">{info.map(getInfo)}</div>
      <div className="device-info__chart">
        {getChart({ keyX: 'name', keyY: 'uv', data: data })}
      </div>
    </div>
  ));

  return (
    <div className="device-info">
      <div
        className={
          hasError
            ? 'device-info__wrapper device-info__wrapper_error'
            : 'device-info__wrapper'
        }
      >
        <div className="device-info__title">{title}</div>
        <div className="device-info__tabs">
          <TabContainer>{tabEls}</TabContainer>
        </div>
      </div>
    </div>
  );
};

export default DeviceInfo;

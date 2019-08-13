import * as React from 'react';

import Button from '@shared/Button/Button';
import { Icon, IconImage } from '@components/Icon/Icon';

export type DeviceMonitorProps = {
  title: string;
  hasError: boolean;
  button: { onClick: (event?: React.MouseEvent) => void; value: string };
  devices: Array<string | IconImage>;
};

const DeviceMonitor: React.FC<DeviceMonitorProps> = ({
  hasError,
  title,
  button,
  devices
}) => {
  const deviceEls = devices.map(device => {
    const isIcon: boolean = Object.values(IconImage).includes(device);

    if (isIcon)
      return (
        <div className="device-monitor__device">
          <Icon image={device as IconImage} size="small" />
        </div>
      );

    return <div className="device-monitor__device">{device}</div>;
  });

  return (
    <div className="device-monitor">
      <div
        className={
          hasError
            ? 'device-monitor__wrapper device-monitor__wrapper_error'
            : 'device-monitor__wrapper'
        }
      >
        <div className="device-monitor__title">{title}</div>
        <div className="device-monitor__devices">{deviceEls}</div>
        <Button onClick={button.onClick}>{button.value}</Button>
      </div>
    </div>
  );
};

export default DeviceMonitor;

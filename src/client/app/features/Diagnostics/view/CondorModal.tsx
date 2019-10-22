import * as React from 'react';
import { connect } from 'react-redux';

import { Modal } from '@features/Modal';
import { IconImage } from '@components/Icon/Icon';
import DeviceInfo from './DeviceInfo';
import DeviceMonitor, { DeviceMonitorProps } from './DeviceMonitor';

import { closeModal } from '@features/Modal/redux/actions';

type OwnProps = {
  id: string;
};
type Props = OwnProps & typeof mapDispatch;

class CondorModal extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { id, closeModal } = this.props;

    const getDevices = (devices: Array<DeviceMonitorProps>) =>
      devices.map(device => (
        <div className="condor-modal__device">
          <DeviceMonitor {...device} />
        </div>
      ));

    return (
      <Modal open={true} onClose={closeModal} maxWidthPercentage={70}>
        <Modal.Header>Condor #{id}</Modal.Header>
        <Modal.Content>
          <div className="condor-modal">
            <div className="condor-modal__column">
              <div className="condor-modal__device-info">
                <DeviceInfo
                  title="Плотнометр"
                  hasError={false}
                  tabs={[
                    {
                      title: 'Источник питания',
                      info: [
                        { title: 'Напряжение, В', value: '2.5', valid: true },
                        { title: 'Ток, А', value: '100', valid: false }
                      ],
                      chartData: []
                    },
                    {
                      title: 'Рентгеновская трубка',
                      info: [
                        { title: 'Напряжение, В', value: '2.5', valid: true },
                        { title: 'Ток, А', value: '100', valid: false }
                      ],
                      chartData: []
                    },
                    {
                      title: 'Детектор',
                      info: [
                        { title: 'Напряжение, В', value: '2.5', valid: true },
                        { title: 'Ток, А', value: '100', valid: false }
                      ],
                      chartData: []
                    },
                    {
                      title: 'Защита',
                      info: [
                        { title: 'Напряжение, В', value: '2.5', valid: true },
                        { title: 'Ток, А', value: '100', valid: false }
                      ],
                      chartData: []
                    }
                  ]}
                />
              </div>
              <div className="condor-modal__device-info">
                <DeviceInfo
                  title="Система электропитания"
                  hasError={false}
                  tabs={[
                    {
                      title: 'Источник питания',
                      info: [
                        { title: 'Напряжение, В', value: '2.5', valid: true },
                        { title: 'Ток, А', value: '100', valid: false }
                      ],
                      chartData: []
                    }
                  ]}
                />
              </div>
            </div>
            <div className="condor-modal__column">
              <div className="condor-modal__devices">
                {getDevices([
                  {
                    title: 'Георадар',
                    devices: ['Блок управления', 'АБ2000', 'АБ400', 'Одометр'],
                    button: { value: 'Сбросить ошибки', onClick: () => {} },
                    hasError: false
                  },
                  {
                    title: 'ПК',
                    devices: [],
                    button: { value: 'Перезагрузить', onClick: () => {} },
                    hasError: true
                  },
                  {
                    title: 'Коммутатор',
                    devices: [
                      IconImage.COMPASS,
                      IconImage.GRAPH,
                      IconImage.WIFI
                    ],
                    button: { value: 'Сбросить ошибки', onClick: () => {} },
                    hasError: false
                  },
                  {
                    title: 'Профилометр',
                    devices: ['Лазер1', 'Лазер2'],
                    button: { value: 'Сбросить ошибки', onClick: () => {} },
                    hasError: true
                  },
                  {
                    title: 'Фото-видео мониторинг',
                    devices: ['Камера1', 'Камера2'],
                    button: { value: 'Выгрузить видео', onClick: () => {} },
                    hasError: false
                  },
                  {
                    title: 'GPS мониторинг',
                    devices: ['Спутники'],
                    button: { value: 'Перезагрузить', onClick: () => {} },
                    hasError: false
                  }
                ])}
              </div>
              <div className="condor-modal__device-info">
                <DeviceInfo
                  title="Система жизнеобеспечения"
                  hasError={true}
                  tabs={[
                    {
                      title: 'Заголовок',
                      info: [
                        { title: 'Напряжение, В', value: '2.5', valid: true },
                        { title: 'Ток, А', value: '100', valid: false }
                      ],
                      chartData: []
                    }
                  ]}
                />
              </div>
            </div>
          </div>
          <Modal.Footer />
        </Modal.Content>
      </Modal>
    );
  }
}

const mapDispatch = { closeModal };

export default connect(
  null,
  mapDispatch
)(CondorModal);

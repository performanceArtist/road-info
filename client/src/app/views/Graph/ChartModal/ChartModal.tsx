import React, { useState } from 'react';

import { connect } from 'react-redux';

import Input from '@shared/Input/Input';
import Button from '@shared/Button/Button';
import Modal from '@components/Modal/Modal';
import Dropdown from '@components/Dropdown/Dropdown';
import { closeModal } from '@redux/modal/actions';
import { setBreakpoint, setMax } from '@redux/measurements/actions';

interface ChartModalProps {}

const ChartModal: React.SFC<ChartModalProps> = ({
  chartInfo,
  setBreakpoint,
  setMax,
  closeModal
}) => {
  const [setting, setSetting] = useState({
    value: 'density',
    breakpoint: chartInfo.lines.density.breakpoint
  });

  const [max, setMaxVal] = useState(chartInfo.max);

  const handleClick = () => {
    setBreakpoint(setting.value, setting.breakpoint);
    setMax(max);
    closeModal();
  };

  const handleDropdownChange = event => {
    const key = event.target.value;
    setSetting({ value: key, breakpoint: chartInfo.lines[key].breakpoint });
  };

  const handleInputChange = event => {
    const breakpoint = { ...setting.breakpoint };
    const target = event.target;
    breakpoint[target.name] = target.value;
    setSetting({ ...setting, breakpoint });
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <div className="chart-modal">
        <Modal.Header>Настройки графика</Modal.Header>
        <Modal.Content>
          <div className="chart-modal__breakpoint-title">Полоса</div>
          <div className="chart-modal__breakpoint">
            <div className="chart-modal__input">
              <Dropdown
                name="line"
                value={setting.value}
                options={[
                  { name: 'Плотность', value: 'density' },
                  { name: 'IRI', value: 'iri' },
                  { name: 'Толщина покрытия', value: 'thickness' },
                  { name: 'Колейность', value: 'rutting' }
                ]}
                onChange={handleDropdownChange}
              />
            </div>
            <div className="chart-modal__input">
              <Input
                label="От"
                props={{
                  name: 'start',
                  type: 'number',
                  step: 0.1,
                  value: setting.breakpoint ? setting.breakpoint.start : 0,
                  onChange: handleInputChange
                }}
              />
            </div>
            <div className="chart-modal__input">
              <Input
                label="До"
                props={{
                  name: 'finish',
                  type: 'number',
                  step: 0.1,
                  value: setting.breakpoint ? setting.breakpoint.finish : 0,
                  onChange: handleInputChange
                }}
              />
            </div>
          </div>
          <div className="chart-modal__breakpoint-title">Показания</div>
          <Input
            label="Количество измерений"
            props={{
              name: 'max',
              type: 'number',
              step: 0.1,
              value: max,
              onChange: event => {
                setMaxVal(event.target.value);
              }
            }}
          />
        </Modal.Content>
        <Modal.Footer>
          <Button onClick={handleClick}>Сохранить</Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

const mapStateToProps = ({ measurements }) => ({
  chartInfo: measurements.chartInfo
});

export default connect(
  mapStateToProps,
  { setBreakpoint, setMax, closeModal }
)(ChartModal);

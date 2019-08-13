import * as React from 'react';
import { useState } from 'react';

import { connect } from 'react-redux';

import Form from '@shared/Form/Form';
import Input from '@shared/Input/Input';
import Button from '@shared/Button/Button';

import Modal from '@components/Modal/Modal';
import Dropdown from '@components/Dropdown/Dropdown';

import { closeModal } from '@redux/modal/actions';
import { saveChartSettings } from '@redux/chart/actions';
import { ChartInfo } from '@redux/chart/types';
import { RootState } from '@redux/reducer';

type MapState = {
  chartInfo: ChartInfo;
};

type Props = typeof mapDispatch & MapState;

const ChartModal: React.FC<Props> = ({
  chartInfo,
  saveChartSettings,
  closeModal
}) => {
  const { lines, maxTicks } = chartInfo;
  const [max, setMax] = useState(maxTicks);
  const [lineInfo, setLineInfo] = useState(lines);
  const [key, setCurrentKey] = useState('density');

  const handleSubmit = () => {
    saveChartSettings({ maxTicks: max, lines: lineInfo });
    closeModal();
  };

  const handleInputChange = (event: React.SyntheticEvent) => {
    const newLines = JSON.parse(JSON.stringify(lineInfo));
    const target = event.target as HTMLInputElement;

    if (!newLines[key].breakpoint)
      newLines[key].breakpoint = { start: 0, finish: 0 };
    newLines[key].breakpoint[target.name] = parseFloat(target.value);

    setLineInfo(newLines);
  };

  return (
    <Modal open={true} onClose={closeModal}>
      <Modal.Header>Настройки графика</Modal.Header>
      <Form props={{ onSubmit: handleSubmit }}>
        <Modal.Content>
          <div className="chart-modal">
            <div className="chart-modal__wrapper">
              <div className="chart-modal__breakpoint-title">Полоса</div>
              <div className="chart-modal__breakpoint">
                <div className="chart-modal__input">
                  <Dropdown
                    name="line"
                    value={key}
                    options={[
                      { name: 'Плотность', value: 'density' },
                      { name: 'IRI', value: 'iri' },
                      { name: 'Толщина покрытия', value: 'thickness' },
                      { name: 'Колейность', value: 'rutting' }
                    ]}
                    onChange={(event: React.SyntheticEvent) => {
                      const target = event.target as HTMLInputElement;
                      setCurrentKey(target.value);
                    }}
                  />
                </div>
                <div className="chart-modal__input">
                  <Input
                    label="От"
                    props={{
                      name: 'start',
                      type: 'number',
                      step: 0.1,
                      value: lineInfo[key].breakpoint
                        ? lineInfo[key].breakpoint.start
                        : 0,
                      onChange: handleInputChange,
                      autoFocus: true
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
                      value: lineInfo[key].breakpoint
                        ? lineInfo[key].breakpoint.finish
                        : 0,
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
                  step: 1,
                  min: 1,
                  value: max,
                  onChange: (event: React.SyntheticEvent) => {
                    const target = event.target as HTMLInputElement;
                    setMax(parseInt(target.value, 10));
                  }
                }}
              />
            </div>
            <Modal.Footer>
              <Button type="submit">Сохранить</Button>
            </Modal.Footer>
          </div>
        </Modal.Content>
      </Form>
    </Modal>
  );
};

const mapState = ({ chart }: RootState) => ({
  chartInfo: chart
});

const mapDispatch = { saveChartSettings, closeModal };

export default connect(
  mapState,
  mapDispatch
)(ChartModal);

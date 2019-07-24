import React, { useState } from 'react';

import { connect } from 'react-redux';

import Form from '@shared/Form/Form';
import Input from '@shared/Input/Input';
import Button from '@shared/Button/Button';

import Modal from '@components/Modal/Modal';
import Dropdown from '@components/Dropdown/Dropdown';

import { closeModal } from '@redux/modal/actions';
import { saveChartSettings } from '@redux/measurements/actions';
import { ChartLineInfo, ChartInfo } from '@redux/measurements/types';
import { RootState } from '@redux/reducer';

interface State {
  key: string;
  maxTicks: number;
  lines: Array<ChartLineInfo>;
}

type MapState = {
  chartInfo: ChartInfo;
};

type Props = typeof mapDispatch & MapState;

class ChartModal extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { lines, maxTicks } = props.chartInfo;

    this.state = {
      key: 'density',
      maxTicks,
      lines
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit() {
    const { saveChartSettings, closeModal } = this.props;
    const { maxTicks, lines } = this.state;

    saveChartSettings({ maxTicks, lines });
    closeModal();
  }

  handleInputChange(event: React.SyntheticEvent) {
    const { key, lines } = this.state;
    const newLines = JSON.parse(JSON.stringify(lines));
    const target = event.target as HTMLInputElement;

    if (!newLines[key].breakpoint) newLines[key].breakpoint = {};
    newLines[key].breakpoint[target.name] = parseFloat(target.value);
    this.setState({ lines: newLines });
  }

  render() {
    const { closeModal } = this.props;
    const { key, maxTicks, lines } = this.state;
    const currentLine = lines[key];

    return (
      <Modal open={true} onClose={closeModal}>
        <Modal.Header>Настройки графика</Modal.Header>
        <Form props={{ onSubmit: this.handleSubmit }}>
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
                        this.setState({ key: target.value });
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
                        value: currentLine.breakpoint
                          ? currentLine.breakpoint.start
                          : 0,
                        onChange: this.handleInputChange,
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
                        value: currentLine.breakpoint
                          ? currentLine.breakpoint.finish
                          : 0,
                        onChange: this.handleInputChange
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
                    value: maxTicks,
                    onChange: (event: React.SyntheticEvent) => {
                      const target = event.target as HTMLInputElement;
                      this.setState({ maxTicks: parseInt(target.value) });
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
  }
}

const mapState = ({ measurements }: RootState) => ({
  chartInfo: measurements.chartInfo
});

const mapDispatch = { saveChartSettings, closeModal };

export default connect(
  mapState,
  mapDispatch
)(ChartModal);

import React, { useState } from 'react';

import { connect } from 'react-redux';

import Input from '@shared/Input/Input';
import Button from '@shared/Button/Button';
import Modal from '@components/Modal/Modal';
import Dropdown from '@components/Dropdown/Dropdown';
import { closeModal } from '@redux/modal/actions';
import { saveChartSettings } from '@redux/measurements/actions';

interface ChartModalProps {}

class ChartModal extends React.Component<ChartModalProps> {
  constructor(props) {
    super(props);

    const { lines, maxTicks } = props.chartInfo;

    this.state = {
      key: 'density',
      maxTicks,
      lines
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleClick() {
    const { saveChartSettings, closeModal } = this.props;
    const { maxTicks, lines } = this.state;

    saveChartSettings({ maxTicks, lines });
    closeModal();
  }

  handleInputChange(event) {
    const { key, lines } = this.state;
    const newLines = JSON.parse(JSON.stringify(lines));

    newLines[key].breakpoint[event.target.name] = event.target.value;
    this.setState({ lines: newLines });
  }

  render() {
    const { closeModal } = this.props;
    const { key, maxTicks, lines } = this.state;
    const currentLine = lines[key];

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
                  value={key}
                  options={[
                    { name: 'Плотность', value: 'density' },
                    { name: 'IRI', value: 'iri' },
                    { name: 'Толщина покрытия', value: 'thickness' },
                    { name: 'Колейность', value: 'rutting' }
                  ]}
                  onChange={event => this.setState({ key: event.target.value })}
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
                    onChange: this.handleInputChange
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
                onChange: (event: React.SyntheticEvent) =>
                  this.setState({ maxTicks: parseInt(event.target.value) })
              }}
            />
          </Modal.Content>
          <Modal.Footer>
            <Button onClick={this.handleClick}>Сохранить</Button>
          </Modal.Footer>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = ({ measurements }) => ({
  chartInfo: measurements.chartInfo
});

export default connect(
  mapStateToProps,
  { saveChartSettings, closeModal }
)(ChartModal);

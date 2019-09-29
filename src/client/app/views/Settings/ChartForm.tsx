import * as React from 'react';
import { useState } from 'react';

import { connect } from 'react-redux';

import { Form, Input, Button } from '@shared/view';
import Dropdown from '@components/Dropdown/Dropdown';
import { saveChartSettings } from '@features/CompositeChart/redux/actions';
import { ChartInfo } from '@shared/types';
import { RootState } from '@redux/reducer';

type MapState = {
  chartInfo: ChartInfo;
};

type Props = typeof mapDispatch & MapState;

const ChartForm: React.FC<Props> = ({ chartInfo, saveChartSettings }) => {
  const { lines, maxTicks } = chartInfo;
  const [max, setMax] = useState(maxTicks);
  const [lineInfo, setLineInfo] = useState(lines);
  const [key, setCurrentKey] = useState('density');

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    saveChartSettings({ maxTicks: max, lines: lineInfo });
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
    <Form props={{ onSubmit: handleSubmit }}>
      <div className="chart-form">
        <div className="chart-form__wrapper">
          <div className="chart-form__input-group">
            <div className="chart-form__title">Полоса</div>
            <div className="chart-form__breakpoint">
              <div className="chart-form__input">
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
              <div className="chart-form__input">
                <Input
                  label="От"
                  remWidth={4}
                  modifier="inline"
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
              <div className="chart-form__input">
                <Input
                  label="До"
                  remWidth={4}
                  modifier="inline"
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
          </div>
          <div className="chart-form__input-group">
            <div className="chart-form__title">Показания</div>
            <div className="chart-form__scroll-input">
              <Input
                label="Количество измерений:"
                remWidth={4}
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
          </div>
        </div>
        <Button type="submit">Сохранить</Button>
      </div>
    </Form>
  );
};

const mapState = ({ chart }: RootState) => ({
  chartInfo: chart
});

const mapDispatch = { saveChartSettings };

export default connect(
  mapState,
  mapDispatch
)(ChartForm);

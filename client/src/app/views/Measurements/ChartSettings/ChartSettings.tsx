import React from 'react';
import { connect } from 'react-redux';

import Dropdown from '@components/Dropdown/Dropdown';
import Start from '@components/Start/Start';
import Form from '@shared/Form/Form';
import Input from '@shared/Input/Input';
import Button from '@shared/Button/Button';

import { MEASUREMENT } from '@redux/measurements/actions';

const ChartSettings: React.FC = ({ changeVisibility, chartInfo }) => {
  const checkboxes = chartInfo.map(({ name, units, show }) => (
    <Input
      label={units}
      props={{
        type: 'checkbox',
        checked: show,
        onChange: event => changeVisibility(name, event.target.checked)
      }}
    />
  ));

  return (
    <Form>
      <div className="chart-settings">
        <div className="chart-settings__wrapper">
          <div className="chart-settings__title">Настройки</div>
          {/*<Dropdown
          name="line"
          options={['Плотность', 'IRI', 'Толщина покрытия', 'Колейность']}
        />
        <Input label="Breakpoint" props={{ type: 'number' }} />
        <Button type="submit">Сохранить</Button>*/}
          <div className="chart-settings__start">
            <Start />
          </div>
          <div className="chart-settings__lines">{checkboxes}</div>
        </div>
      </div>
    </Form>
  );
};

const mapState = ({ measurements }) => ({
  ...measurements
});

const mapDispatch = dispatch => ({
  changeSettings: settings =>
    dispatch({ type: MEASUREMENT.CHART.CHANGE_SETTINGS, payload: settings }),
  changeVisibility: (name: string, show: boolean) =>
    dispatch({
      type: MEASUREMENT.CHART.CHANGE_VISIBILITY,
      payload: { name, show }
    })
});

export default connect(
  mapState,
  mapDispatch
)(ChartSettings);

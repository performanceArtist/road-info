import React from 'react';
import { connect } from 'react-redux';

import Dropdown from '@components/Dropdown/Dropdown';
import Form from '@shared/Form/Form';
import Input from '@shared/Input/Input';
import Button from '@shared/Button/Button';

import { MEASUREMENT } from '@redux/measurements/actions';

const ChartSettings: React.SFC = ({ taskData, currentTask }) => {
  const task = taskData[currentTask];

  if (!task) return null;

  const chart = task.chartInfo;

  return (
    <Form>
      <div className="chart-settings">
        <Dropdown
          name="line"
          options={['Плотность', 'IRI', 'Толщина покрытия', 'Колейность']}
        />
        <Input label="Breakpoint" props={{ type: 'number' }} />
        <Button type="submit">Сохранить</Button>
      </div>
    </Form>
  );
};

const mapStateToProps = ({ measurements }) => ({
  ...measurements
});

const mapDispatchToProps = dispatch => ({
  changeSettings: settings =>
    dispatch({ type: MEASUREMENT.CHART.CHANGE_SETTINGS, payload: settings })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartSettings);

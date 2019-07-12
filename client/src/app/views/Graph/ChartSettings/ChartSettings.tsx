import React from 'react';
import { connect } from 'react-redux';

import Start from '@components/Start/Start';
import Form from '@shared/Form/Form';
import Input from '@shared/Input/Input';

import { changeVisibility } from '@redux/measurements/actions';

const ChartSettings: React.SFC = ({ changeVisibility, chartInfo }) => {
  const checkboxes = chartInfo.map(({ name, units, show }) => {
    if (name !== 'density') return null;
    return (
      <Input
        label={units}
        props={{
          type: 'checkbox',
          checked: show,
          onChange: event => changeVisibility(name, event.target.checked)
        }}
      />
    );
  });

  return (
    <Form>
      <div className="chart-settings">
        <div className="chart-settings__wrapper">
          <div className="chart-settings__lines">{checkboxes}</div>
        </div>
      </div>
    </Form>
  );
};

const mapStateToProps = ({ measurements }) => ({
  ...measurements
});

export default connect(
  mapStateToProps,
  { changeVisibility }
)(ChartSettings);

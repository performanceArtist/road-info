import React from 'react';
import { connect } from 'react-redux';

import Start from '@components/Start/Start';
import Form from '@shared/Form/Form';
import Input from '@shared/Input/Input';

import { changeVisibility } from '@redux/measurements/actions';
import { RootState } from '@redux/reducer';

type Props = typeof mapState & typeof mapDispatch;

const ChartSettings: React.FC<Props> = ({ changeVisibility, chartInfo }) => {
  const checkboxes = chartInfo.map(({ name, units, show }) => {
    if (name !== 'density') return null;
    return (
      <Input
        label={units}
        props={{
          type: 'checkbox',
          checked: show,
          onChange: (event: React.SyntheticEvent) => {
            const target = event.target as HTMLInputElement;
            changeVisibility(name, target.checked);
          }
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

const mapState = ({ measurements }: RootState) => ({
  chartInfo: measurements.chartInfo
});

const mapDispatch = { changeVisibility };

export default connect(
  mapState,
  mapDispatch
)(ChartSettings);

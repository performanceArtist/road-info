import React from 'react';
import { connect } from 'react-redux';

import Start from '@components/Start/Start';
import Form from '@shared/Form/Form';
import Input from '@shared/Input/Input';

import { changeVisibility } from '@redux/chart/actions';
import { RootState } from '@redux/reducer';
import { ChartInfo } from '@redux/chart/types';

type MapState = {
  chartInfo: ChartInfo;
};

type Props = MapState & typeof mapDispatch;

const ChartSettings: React.FC<Props> = ({ changeVisibility, chartInfo }) => {
  /*
  const checkboxes = chartInfo.lines.map(({ name, units, show }) => {
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
*/
  return (
    <Form>
      <div className="chart-settings">
        <div className="chart-settings__wrapper">
          <div className="chart-settings__lines">{null}</div>
        </div>
      </div>
    </Form>
  );
};

const mapState = ({ chart }: RootState) => ({
  chartInfo: chart
});

const mapDispatch = { changeVisibility };

export default connect(
  mapState,
  mapDispatch
)(ChartSettings);

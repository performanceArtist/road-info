import * as React from 'react';
import { connect } from 'react-redux';

import HistoryForm from './HistoryForm';
import HistoryPanel from './HistoryPanel';

import { getMeasurements } from '@redux/history/actions';

import { RootState } from '@redux/reducer';
import { Suggestion } from '@redux/suggestion/types';
import { Filters } from '@redux/history/types';

type MapState = {
  tasks: Array<object>;
  instances: Array<object>;
  measurements: any;
  suggestions: Suggestion;
  fetching: boolean;
  filters: Filters;
};

type Props = MapState & typeof mapDispatch;

const History: React.FC<Props> = ({
  filters,
  tasks,
  instances,
  measurements,
  fetching,
  suggestions,
  getMeasurements
}) => {
  return (
    <div className="history">
      <div className="history__form">
        <HistoryForm filters={filters} suggestions={suggestions} />
      </div>

      <div className="history__panel">
        <HistoryPanel
          tasks={tasks}
          instances={instances}
          measurements={measurements}
          fetching={fetching}
          fetchMeasurements={getMeasurements}
        />
      </div>
    </div>
  );
};

const mapState = ({
  history: { filters, tasks, instances, measurements, fetching },
  suggestions
}: RootState) => ({
  tasks,
  instances,
  measurements,
  fetching,
  filters,
  suggestions: suggestions.history
});

const mapDispatch = {
  getMeasurements
};

export default connect(
  mapState,
  mapDispatch
)(History);

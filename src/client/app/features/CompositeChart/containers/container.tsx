import { connect } from 'react-redux';

import CompositeChart from '../CompositeChart';
import { RootState } from '@redux/reducer';

const mapState = ({ measurements, chart, tasks }: RootState) => ({
  measurements,
  tasks: tasks.tasks,
  chartInfo: chart
});

export default connect(mapState)(CompositeChart);

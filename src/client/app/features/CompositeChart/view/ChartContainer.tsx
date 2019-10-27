import { connect } from 'react-redux';

import CompositeChart from './CompositeChart';
import { RootState } from '@redux/reducer';

const mapState = ({
  data: { measurements, jobs, tasks },
  chart
}: RootState) => ({
  measurements,
  jobs,
  tasks,
  chartInfo: chart
});

export default connect(mapState)(CompositeChart);

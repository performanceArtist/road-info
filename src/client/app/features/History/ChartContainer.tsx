import { connect } from 'react-redux';

import CompositeChart from '@features/CompositeChart/CompositeChart';
import { RootState } from '@redux/reducer';

const mapState = ({ chart }: RootState) => ({
  chartInfo: chart
});

export default connect(mapState)(CompositeChart);

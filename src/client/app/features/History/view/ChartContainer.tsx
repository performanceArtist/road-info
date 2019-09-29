import { connect } from 'react-redux';

import HistoryChart from './HistoryChart';
import { RootState } from '@redux/reducer';

const mapState = ({ chart }: RootState) => ({
  chartInfo: chart
});

export default connect(mapState)(HistoryChart);

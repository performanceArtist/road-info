import { request } from '@shared/utils';
import { MEASUREMENTS } from '../actions';

export default request({
  url: '/api/generate',
  apiAction: MEASUREMENTS.GENERATE,
  method: 'get'
});

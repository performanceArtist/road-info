import { request } from '@shared/utils';

import { HISTORY } from '../actions';

export default request({
  url: '/api/measurements',
  apiAction: HISTORY.GET_MEASUREMENTS,
  method: 'get'
});

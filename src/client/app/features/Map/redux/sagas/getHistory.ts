import { request } from '@shared/utils';

import { MAP } from '../actions';

export default request({
  url: '/api/history',
  apiAction: MAP.GET_HISTORY,
  method: 'get'
});

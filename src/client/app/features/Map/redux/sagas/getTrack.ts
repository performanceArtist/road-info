import { MAP } from '../actions';

import { request } from '@shared/utils';

export default request({
  url: '/api/track',
  apiAction: MAP.GET_TRACK,
  method: 'get'
});

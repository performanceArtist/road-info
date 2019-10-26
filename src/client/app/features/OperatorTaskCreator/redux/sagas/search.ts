import { request } from '@shared/utils';

import { NEWTASK } from '../actions';

export default request({
  url: 'api/location',
  apiAction: NEWTASK.LOCATION_SEARCH,
  method: 'get'
});

import { request } from '@shared/utils';
import { CONDORS } from '../actions';

export default request({
  url: '/api/condors',
  apiAction: CONDORS.INIT,
  method: 'get'
});

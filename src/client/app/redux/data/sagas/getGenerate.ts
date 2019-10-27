import { request } from '@shared/utils';
import { DATA } from '../actions';

export default request({
  url: '/api/generate',
  apiAction: DATA.GENERATE,
  method: 'get'
});

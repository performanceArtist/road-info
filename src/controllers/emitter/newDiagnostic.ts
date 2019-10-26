import { io } from '@root/server';
import { DatabaseCondorInfo } from '@shared/types';

import { inferInfoValue } from '../condor';

export default async function(info: DatabaseCondorInfo) {
  io.emit('message', {
    type: 'new_diagnostic',
    payload: inferInfoValue(info)
  });
}

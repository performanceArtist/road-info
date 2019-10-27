import { io } from '@root/server';
import { DatabaseCondorInfo } from '@shared/types';

import { inferInfoValue } from '../condor';

export default async function(info: DatabaseCondorInfo) {
  io.emit('message', {
    type: 'condor_update',
    payload: { id: info.condor_id, info: inferInfoValue(info) }
  });
}

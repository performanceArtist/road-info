import { ServerCondor } from '@shared/types';

import { CONDORS } from './actions';

const initialState: ServerCondor[] = [];

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case CONDORS.INIT.SUCCESS:
      return state.concat(payload);
    case CONDORS.UPDATE:
      return state.map(condor => (condor.id === payload.id ? payload : condor));
    default:
      return state;
  }
}

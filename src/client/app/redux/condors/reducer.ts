import { ServerCondor, CondorValue } from '@shared/types';

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
      const { id, info }: { id: number; info: CondorValue } = payload;
      return state.map(condor =>
        condor.id === id ? { ...condor, [info.key]: info.value } : condor
      );
    default:
      return state;
  }
}

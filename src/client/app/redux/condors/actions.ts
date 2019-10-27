import { actionTree, a } from '@shared/utils';
import { CondorValue } from '@shared/types';

export const CONDORS = actionTree('CONDORS')({
  UPDATE: a.plain,
  INIT: a.api
});

export const updateCondor = (payload: { id: number; info: CondorValue }) => ({
  type: CONDORS.UPDATE,
  payload
});

export const initCondors = () => ({
  type: CONDORS.INIT.REQUEST
});

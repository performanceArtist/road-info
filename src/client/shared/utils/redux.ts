import { ApiAction } from '@shared/types';

export const apiAction = (base: string, action: string): ApiAction => {
  return {
    REQUEST: `${base}.${action}.REQUEST`,
    SUCCESS: `${base}.${action}.SUCCESS`,
    FAILURE: `${base}.${action}.FAILURE`
  };
};

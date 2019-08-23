import * as R from 'ramda';

import { SUGGESTION, addConstraint } from './actions';
import { Suggestions } from './types';

const initialState: Suggestions = {
  task: {},
  history: {}
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case SUGGESTION.GET.SUCCESS: {
      const { form, name, suggestions } = payload;
      return R.assocPath([form, name, 'items'], suggestions.slice(0, 5), state);
    }
    case SUGGESTION.ADD_CONSTRAINT: {
      const { form, id, target, name } = payload;
      const fullName = `${name}_fias_id`;

      const update = state[name]
        ? {
            items: R.path([target, 'items'], state),
            constraint: { [fullName]: id }
          }
        : {
            items: [],
            constraint: { [fullName]: id }
          };

      return R.assocPath([form, target], update, state);
    }
    case SUGGESTION.ADD_LAST: {
      const { form, value, id, name } = payload;

      return R.assocPath([form, name, 'last'], { value, id }, state);
    }
    default:
      return state;
  }
}

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
      return {
        ...state,
        [form]: {
          ...state[form],
          [name]: { ...state[form][name], items: suggestions.slice(0, 5) }
        }
      };
    }
    case SUGGESTION.ADD_CONSTRAINT: {
      const { form, value, id, target, name } = payload;
      const fullName = `${name}_fias_id`;

      if (!state[name])
        return {
          ...state,
          [form]: {
            ...state[form],
            [name]: {
              ...state[form][name],
              last: { value, id }
            },
            [target]: {
              items: [],
              constraint: { [fullName]: id }
            }
          }
        };

      return {
        ...state,
        [form]: {
          ...state[form],
          [name]: {
            ...state[form][name],
            last: { value, id }
          },
          [target]: {
            items: state[target].items,
            constraint: { [fullName]: id }
          }
        }
      };
    }
    default:
      return state;
  }
}

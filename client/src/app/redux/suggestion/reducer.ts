import { SUGGESTION } from './actions';
import { Suggestions } from './types';

const initialState: Suggestions = {};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case SUGGESTION.GET.SUCCESS: {
      const { name, suggestions } = payload;
      return {
        ...state,
        [name]: { items: suggestions.slice(0, 5), last: null }
      };
    }
    case SUGGESTION.ADD_CONSTRAINT: {
      const { id, name } = payload;
      if (!state[name]) return state;
      return {
        ...state,
        [name]: {
          ...state[name],
          last: id
        }
      };
    }
    default:
      return state;
  }
}

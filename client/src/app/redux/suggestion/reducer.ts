import { SUGGESTION } from './actions';

const initialState = {};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case SUGGESTION.GET.SUCCESS: {
      const { name, suggestions } = payload;
      return {
        ...state,
        [name]: { items: suggestions.slice(0, 5), current: null }
      };
    }
    default:
      return state;
  }
}

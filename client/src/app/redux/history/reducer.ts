import { HISTORY } from './actions';

const initialState = {
  entries: []
};

export default function reducer(
  state = initialState,
  { type, payload }: { type: string; payload: any }
) {
  switch (type) {
    case HISTORY.GET.SUCCESS:
      return {
        ...state,
        entries: state.entries.concat(payload)
      };
    default:
      return state;
  }
}

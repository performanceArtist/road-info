import { INCREMENT } from './actions';

const initialState = {
  counter: 0
};

const reducer = (
  state = initialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case INCREMENT:
      return { ...state, counter: state.counter + 1 };
    default:
      return state;
  }
};

export default reducer;

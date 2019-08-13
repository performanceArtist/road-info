import { IO } from './actions';

type State = {
  channelStatus: 'on' | 'off';
  serverStatus: 'unknown' | 'on' | 'off';
};

const initialState: State = {
  channelStatus: 'off',
  serverStatus: 'unknown'
};

export default function reducer(
  state = initialState,
  { type }: { type: string }
) {
  switch (type) {
    case IO.CHANNEL_ON:
      return { ...state, channelStatus: 'on' };
    case IO.CHANNEL_OFF:
      return { ...state, channelStatus: 'off', serverStatus: 'unknown' };
    case IO.SERVER_OFF:
      return { ...state, serverStatus: 'off' };
    case IO.SERVER_ON:
      return { ...state, serverStatus: 'on' };
    default:
      return state;
  }
}

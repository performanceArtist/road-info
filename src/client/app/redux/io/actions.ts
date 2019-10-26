import { a, actionTree } from '@shared/utils';

export const IO = actionTree('IO')({
  START_CHANNEL: a.plain,
  STOP_CHANNEL: a.plain,
  CHANNEL_ON: a.plain,
  CHANNEL_OFF: a.plain,
  SERVER_ON: a.plain,
  SERVER_OFF: a.plain
});

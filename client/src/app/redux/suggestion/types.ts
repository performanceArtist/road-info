export type Suggestion = {
  items: Array<string>;
  current: null | string;
};

export type Suggestions = {
  [key: string]: Suggestion;
};

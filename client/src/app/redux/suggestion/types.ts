export type Suggestion = {
  items: Array<string>;
  current: null | string;
  constraint: null | string;
};

export type Suggestions = {
  [key: string]: {
    [key: string]: Suggestion;
  };
};

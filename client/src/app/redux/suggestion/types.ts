export type Suggestion = {
  items: Array<string>;
  constraint: null | string;
  last?: { id: string; value: string };
  [key: string]: any;
};

export type Suggestions = {
  [key: string]: {
    [key: string]: Suggestion;
  };
};

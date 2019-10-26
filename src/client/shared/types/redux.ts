export type PlainAction = {
  type: string;
  payload?: any;
};

export type ApiRequest = {
  type: string;
  payload?: {
    [key: string]: any;
  };
};

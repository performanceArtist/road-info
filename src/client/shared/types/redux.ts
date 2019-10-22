export type PlainAction = {
  type: string;
  payload?: any;
};

export type ApiAction = {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
};

export type ApiRequest = {
  type: string;
  payload?: {
    [key: string]: any;
  };
};

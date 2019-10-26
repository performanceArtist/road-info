export class ApiAction {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;

  constructor(base: string, action: string) {
    this.REQUEST = `${base}.${action}.REQUEST`;
    this.SUCCESS = `${base}.${action}.SUCCESS`;
    this.FAILURE = `${base}.${action}.FAILURE`;
  }
}

export type ActionModel = {
  [key: string]: ActionType;
};

export type ActionType = ApiAction | string | ActionModel;

export const actionTree = (base: string) => <T extends ActionModel>(
  model: T
): T => {
  const result = Object.keys(model).reduce<ActionModel>(
    (acc, cur) => {
      const action = model[cur];

      if (action instanceof ApiAction) {
        acc[cur] = new ApiAction(base, cur);
      } else if (typeof action === 'object') {
        acc[cur] = actionTree(`${base}.${cur}`)(model[cur] as T);
      } else if (typeof action === 'string') {
        acc[cur] = `${base}.${cur}`;
      }

      return acc;
    },
    {} as ActionModel
  );

  return result as T;
};

export const a = {
  api: new ApiAction('', ''),
  plain: ''
};

/*
const example = actionTree('TODO')({
  ADD: a.plain,
  FETCH: a.api,
  KEK: {
    POK: a.api,
    NESTED: {
      TEST: a.api
    }
  }
});
*/

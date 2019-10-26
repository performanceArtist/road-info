type ApiAction = {
  REQUEST: string;
  SUCCESS: string;
  FAILURE: string;
};

type ActionTree = {
  [key: string]: string | ApiAction | ActionTree;
};

type ActionModel = {
  [key: string]: ActionType;
};

type ActionType = 'api' | 'plain' | ActionModel;

const apiAction = (base: string, action: string): ApiAction => {
  return {
    REQUEST: `${base}.${action}.REQUEST`,
    SUCCESS: `${base}.${action}.SUCCESS`,
    FAILURE: `${base}.${action}.FAILURE`
  };
};

const actionTree = (base: string) => (model: ActionModel): ActionTree => {
  return Object.keys(model).reduce<ActionTree>((acc, cur) => {
    switch (model[cur]) {
      case 'plain':
        acc[cur] = `${base}.${cur}`;
        break;
      case 'api':
        acc[cur] = apiAction(base, cur);
        break;
      default:
        if (typeof model[cur] === 'object') {
          acc[cur] = actionTree(`${base}.${cur}`)(model[cur] as ActionModel);
        }
        break;
    }

    return acc;
  }, {});
};

const a: { [key: string]: ActionType } = {
  api: 'api',
  plain: 'plain'
};

const bb = actionTree('TODO')({
  ADD: a.plain,
  FETCH: a.api,
  KEK: {
    POK: a.api,
    NESTED: {
      TEST: a.plain
    }
  }
});

console.log(bb);

const test = ((bb.KEK as ActionTree).KOK as ApiAction).REQUEST;

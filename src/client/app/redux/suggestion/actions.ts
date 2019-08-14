export const SUGGESTION = {
  GET: {
    REQUEST: 'SUGGESTION.GET.REQUEST',
    SUCCESS: 'SUGGESTION.GET.SUCCESS',
    FAILURE: 'SUGGESTION.GET.FAILURE'
  },
  ADD_CONSTRAINT: 'SUGGESTION.ADD_CONSTRAINT',
  ADD_LAST: 'SUGGESTION.ADD_LAST'
};

export const getSuggestion = ({
  form,
  value,
  name
}: {
  form: string;
  value: string;
  name: string;
}) => ({
  type: SUGGESTION.GET.REQUEST,
  payload: {
    form,
    name,
    value
  }
});

export const addConstraint = ({
  form,
  name,
  target,
  id
}: {
  form: string;
  name: string;
  target: string;
  id: string;
}) => ({
  type: SUGGESTION.ADD_CONSTRAINT,
  payload: {
    form,
    name,
    target,
    id
  }
});

export const addLast = ({
  form,
  name,
  value,
  id
}: {
  form: string;
  name: string;
  value: string;
  id: string;
}) => ({
  type: SUGGESTION.ADD_LAST,
  payload: {
    form,
    name,
    value,
    id
  }
});
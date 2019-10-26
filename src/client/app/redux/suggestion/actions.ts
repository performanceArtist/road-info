import { a, actionTree } from '@shared/utils';

export const SUGGESTION = actionTree('SUGGESTION')({
  ADD_CONSTRAINT: a.plain,
  ADD_LAST: a.plain,
  GET: a.api
});

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

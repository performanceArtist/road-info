export const SUGGESTION = {
  GET: {
    REQUEST: 'SUGGESTION.GET.REQUEST',
    SUCCESS: 'SUGGESTION.GET.SUCCESS',
    FAILURE: 'SUGGESTION.GET.FAILURE'
  },
  ADD_CONSTRAINT: 'SUGGESTION.ADD_CONSTRAINT'
};

export const getSuggestion = ({
  value,
  name
}: {
  value: string;
  name: string;
}) => ({
  type: SUGGESTION.GET.REQUEST,
  payload: {
    name,
    value
  }
});

export const addConstraint = ({ name, id }: { name: string; id: string }) => ({
  type: SUGGESTION.ADD_CONSTRAINT,
  payload: {
    name,
    id
  }
});

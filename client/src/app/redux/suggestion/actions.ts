export const SUGGESTION = {
  GET: {
    REQUEST: 'SUGGESTION.GET.REQUEST',
    SUCCESS: 'SUGGESTION.GET.SUCCESS',
    FAILURE: 'SUGGESTION.GET.FAILURE'
  }
};

export const getSuggestion = (value: string, name: string) => ({
  type: SUGGESTION.GET.REQUEST,
  payload: {
    name,
    value
  }
});

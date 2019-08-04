export const HISTORY = {
  GET: {
    REQUEST: 'HISTORY.GET.REQUEST',
    SUCCESS: 'HISTORY.GET.SUCCESS',
    FAILURE: 'HISTORY.GET.FAILURE'
  }
};

export const getHistory = () => ({
  type: HISTORY.GET.REQUEST
});

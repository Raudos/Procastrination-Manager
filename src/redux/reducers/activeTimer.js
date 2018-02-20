export default (state, action) => {
  switch (action.type) {
    case 'activateTimer':
      return action.data;
    case 'deactivateTimer':
      return null;
    case 'activateBreak':
      return {
        ...state,
        activeBreak: action.data
      };
    case 'deactivateBreak':
      return {
        ...state,
        usedBreaks: [
          ...state.usedBreaks,
          action.data
        ],
        activeBreak: null
      };
  default:
    return state;
  }
};

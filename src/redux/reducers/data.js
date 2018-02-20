export default (state, action) => {
  switch (action.type) {
    case 'initialLoad':
      return action.data.data;
    case 'finishCreation':
      return action.data.updatedData;
    case 'deactivateTimer':
      return action.data;
    case 'updateData':
      return action.data;
  default:
    return state;
  }
};

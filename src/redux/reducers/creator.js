import { initialStore } from "src/redux/store";

export default (state, action) => {
  switch (action.type) {
    case 'updateCreator':
      return {
        ...state,
        [action.data.mode]: {
          ...state[action.data.mode],
          ...action.data.updatedData
        }
      };
    case 'finishCreation':
      return {
        ...state,
        [action.data.mode]: initialStore.creator[action.data.mode]
      };
  default:
    return state;
  }
};

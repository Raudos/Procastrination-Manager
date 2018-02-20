import { initialStore } from "src/redux/store";

export default (state, action) => {
  switch (action.type) {
    case 'initialLoad':
      return action.data.data.options
    case 'changeOptions':
      return action.data
  default:
    return state;
  }
};

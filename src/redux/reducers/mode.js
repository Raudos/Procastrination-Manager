import { initialStore } from "src/redux/store";

export default (state, action) => {
  switch (action.type) {
    case 'initialLoad':
      return action.data.mode;
  default:
    return state;
  }
};

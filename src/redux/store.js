import { createStore as createStoreFunc, applyMiddleware } from 'redux';
import logger from "redux-logger";
import thunk from "redux-thunk";
import { createReactNavigationReduxMiddleware, createReduxBoundAddListener } from "react-navigation-redux-helpers";

// Other
import combineReducer from 'src/redux/reducers/index';

const navigationMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.navigation
);
const addNavigationListener = createReduxBoundAddListener("root");

const initialStoreObj = {
  data: false,
  creator: {
    TimerCreator: {
      name: "",
      icon: null,
      color: "blue",
      tags: [],
      breaks: []
    },
    TagCreator: {
      name: "",
      icon: null,
      color: "blue",
    },
    BreakCreator: {
      name: "",
      icon: null,
      color: "blue",
      time: 60
    }
  },
  activeTimer: null,
  mode: null
};

export { addNavigationListener };
export const initialStore = initialStoreObj;

export const createStore = this.__DEV__ ?
  createStoreFunc(combineReducer, initialStoreObj, applyMiddleware(thunk, logger, navigationMiddleware))
    :
  createStoreFunc(combineReducer, initialStoreObj, applyMiddleware(thunk, navigationMiddleware));

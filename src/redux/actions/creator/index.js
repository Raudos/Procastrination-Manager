import shortid from "shortid";
import { AsyncStorage } from "react-native";
import _ from "lodash";

import Toast from "src/reusables/toast";
import getRandomColor from "src/reusables/randomColor";

export const updateCreator = (mode, data, onSuccess = () => {}) => {
  return (dispatch, getState) => {
    dispatch({
      type: "updateCreator",
      data: {
        mode,
        updatedData: data
      }
    });

    onSuccess();
  };
};

const dictionary = {
  TimerCreator: "timers",
  TagCreator: "tags",
  BreakCreator: "breaks"
};

export const finishCreation = (mode, props) => {
  const onSuccess = id => {
    props.navigation.navigate(_.capitalize(dictionary[mode]), {id});
  };

  const onFailure = () => {
    props.navigation.navigate("List");
    Toast("Unexpected error occured, action stopped.");
  };

  return (dispatch, getState) => {
    const currentState = getState();
    const id = shortid.generate();

    currentState.data[dictionary[mode]].push({
      ...currentState.creator[mode],
      id,
      created: Math.round(new Date().getTime() / 1000),
      color: getRandomColor()
    });

    AsyncStorage.setItem("procastrinationAppData", JSON.stringify(currentState.data)).then(whatever => {
      dispatch({
        type: "finishCreation",
        data: {
          mode,
          updatedData: currentState.data
        }
      });

      onSuccess(id);
    }).catch(e => {
      onFailure();
    });
  };
};

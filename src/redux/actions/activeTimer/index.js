import { AsyncStorage } from "react-native";
import shortid from "shortid";

import Toast from "src/reusables/toast";

export const deactivateBreak = userTriggered => {
  return (dispatch, getState) => {
    const currentState = getState();
    const { activeBreak } = currentState.activeTimer;

    dispatch({
      type: "deactivateBreak",
      data: {
        start: activeBreak.start,
        end: userTriggered ? Math.round(new Date().getTime() / 1000) : (activeBreak.end || Math.round(new Date().getTime() / 1000))
      }
    });
  };
};

export const activateBreak = (id = false) => {
  return (dispatch, getState) => {
    const currentState = getState();
    const pickedBreak = currentState.data.breaks.filter(obj => obj.id === id)[0] || {id: null, time: 0};

    dispatch({
      type: "activateBreak",
      data: {
        id: pickedBreak.id,
        start: Math.round(new Date().getTime() / 1000),
        end: id ? Math.round(new Date().getTime() / 1000) + pickedBreak.time : null
      }
    });
  };
};

export const activateTimer = timerId => {
  return (dispatch, getState) => {
    // TODO decide if i want to save activeTimer onto phones memory in case user closes the app
    const timerToActivate = getState().data.timers.filter(obj => obj.id === timerId)[0];

    dispatch({
      type: "activateTimer",
      data: {
        ...timerToActivate,
        start_timestamp: Math.round(new Date().getTime() / 1000),
        activeBreak: null,
        usedBreaks: []
      }
    });
  };
};

export const deactivateTimer = timer => {
  return (dispatch, getState) => {
    const currentState = getState();

    // construct new timestamp
    const newTimestamp = {
      id: shortid.generate(),
      start: currentState.activeTimer.start_timestamp,
      end: Math.round(new Date().getTime() / 1000),
      usedBreaks: currentState.activeTimer.activeBreak ?
        [...currentState.activeTimer.usedBreaks, {start: currentState.activeTimer.activeBreak.start, end: Math.round(new Date().getTime() / 1000)}]
          :
        currentState.activeTimer.usedBreaks
    };

    currentState.data.timers = currentState.data.timers.map(obj => {
      if (obj.id === currentState.activeTimer.id) {
        if (obj.timestamps) {
          obj.timestamps.push(newTimestamp);
        } else {
          obj.timestamps = [newTimestamp];
        }

        return obj;
      }

      return obj;
    });

    AsyncStorage.setItem("procastrinationAppData", JSON.stringify(currentState.data)).then(whatever => {
      dispatch({
        type: "deactivateTimer",
        data: currentState.data
      });
    }).catch(e => {
      Toast("Unexpected error occured, action stopped.");
    });
  };
};

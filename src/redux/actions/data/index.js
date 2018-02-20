import { AsyncStorage } from "react-native";
import DummyData from "src/config/dummyData";

import Toast from "src/reusables/toast";

export const deleteAllData = () => {
  return (dispatch, getState) => {
    const updatedData = {
      timers: [],
      tags: [],
      breaks: [],
      options: {
        lang: "GB",
        showTooltips: true
      }
    };

    AsyncStorage.setItem("procastrinationAppData", JSON.stringify(updatedData)).then(whatever => {
      dispatch({
        type: "initialLoad",
        data: {
          data: updatedData,
          mode: "new"
        }
      });
    }).catch(e => {
      Toast("Unexpected error occured, action stopped.");
    });
  };
};

export const changeOptions = (option, onSuccess = () => {}) => {
  return (dispatch, getState) => {
    const currentState = getState();
    const updatedData = {
      ...currentState.data,
      options: {
        ...currentState.options,
        ...option
      }
    };

    AsyncStorage.setItem("procastrinationAppData", JSON.stringify(updatedData)).then(whatever => {
      dispatch({
        type: "changeOptions",
        data: updatedData.options
      });

      onSuccess();
    }).catch(e => {
      Toast("Unexpected error occured, action stopped.");
    });
  };
};

export const resetToDefault = () => {
  return (dispatch, getState) => {
    AsyncStorage.setItem("procastrinationAppData", JSON.stringify(DummyData)).then(whatever => {
      dispatch({
        type: "initialLoad",
        data: {
          data: DummyData,
          mode: "new"
        }
      });
    }).catch(e => {
      Toast("Unexpected error occured, action stopped.");
    });
  };
};

export const deleteActivity = (timerId, activityId) => {
  return (dispatch, getState) => {
    const currentState = getState();
    const updatedData = {
      ...currentState.data,
      timers: currentState.data.timers.map(timer => {
        if (timer.id === timerId) {
          return {
            ...timer,
            timestamps: timer.timestamps.filter(timestamp => timestamp.id !== activityId)
          };
        }

        return timer;
      })
    };

    AsyncStorage.setItem("procastrinationAppData", JSON.stringify(updatedData)).then(whatever => {
      dispatch({
        type: "updateData",
        data: updatedData
      });

      onSuccess();
    }).catch(e => {
      Toast("Unexpected error occured, action stopped.");
    });
  };
};

export const deleteData = (id, mode, onSuccess) => {
  return (dispatch, getState) => {
    const currentState = getState();

    var updatedData;
    if (mode === "timers") {
      updatedData = {
        ...currentState.data,
        timers: currentState.data[mode].filter(obj => obj.id !== id)
      };
    } else {
      updatedData = {
        ...currentState.data,
        timers: currentState.data.timers.map(timer => ({
          ...timer,
          [mode]: timer[mode].filter(modeId => modeId !== id)
        })),
        [mode]: currentState.data[mode].filter(obj => obj.id !== id)
      };
    }

    AsyncStorage.setItem("procastrinationAppData", JSON.stringify(updatedData)).then(whatever => {
      dispatch({
        type: "updateData",
        data: updatedData
      });

      onSuccess();
    }).catch(e => {
      Toast("Unexpected error occured, action stopped.");
    });
  };
};

const helper = {
  updateBreak: "breaks",
  updateTimer: "timers",
  updateTag: "tags"
};

export const updateData = (id, mode, data, onSuccess) => {
  return (dispatch, getState) => {
    const currentState = getState();
    mode = helper[mode];

    const newData = {
      ...currentState.data,
      [mode]: currentState.data[mode].map(obj => {
        if (obj.id === id) {
          return Object.assign({}, obj, data, {updated: Math.round(new Date().getTime() / 1000)});
        }

        return obj;
      })
    };

    AsyncStorage.setItem("procastrinationAppData", JSON.stringify(newData)).then(whatever => {
      dispatch({
        type: "updateData",
        data: newData
      });

      onSuccess();
    }).catch(e => {
      Toast("Unexpected error occured, action stopped.");
    });
  };
};

export const initialSetup = () => {
  return (dispatch, getState) => {
    AsyncStorage.getItem("procastrinationAppData").then(data => {
      if (data) {
        dispatch({
          type: "initialLoad",
          data: {
            data: JSON.parse(data),
            mode: "existing"
          }
        });
      } else {
        AsyncStorage.setItem("procastrinationAppData", JSON.stringify(DummyData)).then(whatever => {
          dispatch({
            type: "initialLoad",
            data: {
              data: DummyData,
              mode: "new"
            }
          });
        }).catch(e => {
          Toast("Unexpected error occured, action stopped.");
        });
      }
    }).catch(e => {
      Toast("Unexpected error occured, action stopped.");
    });
  };
};

export const createTimer = () => {
  return (dispatch, getState) => {

  };
};

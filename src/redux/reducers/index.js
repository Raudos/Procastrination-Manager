import DataUpdater from "src/redux/reducers/data";
import CreatorUpdater from "src/redux/reducers/creator";
import ActiveTimerUpdater from "src/redux/reducers/activeTimer";
import ModeUpdater from "src/redux/reducers/mode";
import OptionsUpdater from "src/redux/reducers/options";
import NavigationUpdater from "src/redux/reducers/navigation";

export default (currentState, action) => {
  var nextState = {...currentState};

  return {
    data: DataUpdater(nextState.data, action),
    creator: CreatorUpdater(nextState.creator, action),
    activeTimer: ActiveTimerUpdater(nextState.activeTimer, action),
    mode: ModeUpdater(nextState.mode, action),
    options: OptionsUpdater(nextState.options, action),
    navigation: NavigationUpdater(nextState.navigation, action)
  };
}

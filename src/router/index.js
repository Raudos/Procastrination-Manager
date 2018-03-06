import React from 'react';
import { translate } from 'react-i18next';
import { BackHandler } from "react-native";
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation';
import Container from 'react-data-container';
import SplashScreen from 'react-native-splash-screen';
import i18n from 'i18next';
import PropTypes from 'prop-types';

// Components
import ErrorComponent from "src/components/Error/index";
import LoaderComponent from "src/components/Loader/index";
import TimerDetails from "src/components/Data/Details/Timer/index";
import TagDetails from "src/components/Data/Details/Tag/index";
import BreakDetails from "src/components/Data/Details/Break/index";
import Creator from 'src/components/Creator/index';
import Options from 'src/components/Options/index';
import Statistics from 'src/components/Statistics/Tabs';
import List from "src/components/Data/List/index";
import Start from "src/components/Start/index";
import Calendar from "src/components/Calendar/index";

// Other
import { initialSetup } from "src/redux/actions/data/index";
import { addNavigationListener } from 'src/redux/store';
import { resetToDefault, changeOptions, deleteAllData } from "src/redux/actions/data/index";
import { navigate } from "src/redux/actions/navigation/index";

const Navigator = StackNavigator({
    Calendar: {
      screen: Calendar
    },
    Start: {
      screen: Start
    },
    Options: {
      screen: Options
    },
    List: {
      screen: List
    },
    Statistics: {
      screen: Statistics
    },
    Creator: {
      screen: Creator
    },
    Timers: {
      screen: TimerDetails
    },
    Breaks: {
      screen: BreakDetails
    },
    Tags: {
      screen: TagDetails
    }
  }, {
    navigationOptions: {
      header: null
    }
  }
);

@translate("", {
  bindI18n: 'languageChanged',
  bindStore: false
})
@Container({
  isLoading: that => !that.props.mode,
  onMount: that => that.props.initialSetup(),
  Error: that => <ErrorComponent errorText={that.t("error.text")} />,
  Loader: that => <LoaderComponent loadingText={that.t("loader.text")}/>,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      options: state.options,
      mode: state.mode,
      navigation: state.navigation
    }),
    actions: { initialSetup, resetToDefault, changeOptions, deleteAllData, navigate }
  }
})
class NavigatorWithTranslate extends React.Component {
  static propTypes = {
    options: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    navigate: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired
  };

  componentDidMount() {
    i18n.changeLanguage(this.props.options.lang);
    SplashScreen.hide();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackNavigation);
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackNavigation);
  };

  handleBackNavigation = () => {
    const { navigation, navigate } = this.props;

    if (navigation.index === 0) {
      return false;
    }

    navigate(NavigationActions.back());
    return true;
  };

  render() {
    return (
      <Navigator
        navigation={addNavigationHelpers({
          dispatch: this.props.navigate,
          state: this.props.navigation,
          addListener: addNavigationListener
        })}
        screenProps={{
          t: this.props.t,
          resetToDefault: this.props.resetToDefault,
          options: this.props.options,
          changeOptions: this.props.changeOptions,
          deleteAllData: this.props.deleteAllData,
          reduxNavigation: this.props.navigation
        }}
      />
    );
  };
};

export { Navigator };

export default NavigatorWithTranslate;

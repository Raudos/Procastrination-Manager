import React from 'react';
import { View, Text } from "react-native";
import { Icon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { connect } from "react-redux";

// Other
import { parseTimestamp } from "src/reusables/time";
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';
import { deactivateTimer, activateBreak, deactivateBreak } from "src/redux/actions/activeTimer/index";

class TimerTab extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getState(this.props);
  };

  componentWillReceiveProps(nextProps) {
    this.setState(this.getState(nextProps));
  };

  getState = (props) => {
    const timer = Math.round(new Date().getTime() / 1000) - props.activeTimer.start_timestamp;
    const allPreviousBreaks = props.activeTimer.usedBreaks.reduce((prev, curr, index, arr) => {
      return prev + (curr.end - curr.start);
    }, 0);
    const activeBreak = this.getBreak(props.activeTimer.activeBreak)

    if (typeof activeBreak === "object") {
      return {
        timer: (timer - allPreviousBreaks) - activeBreak.timerValueHelper,
        activeBreak: activeBreak.durationOfABreak
      };
    }

    return {
      timer: (timer - allPreviousBreaks) - activeBreak,
      activeBreak
    };
  };

  getBreak = activeBreak => {
    const currentTimestamp = Math.round(new Date().getTime() / 1000);

    if (activeBreak && activeBreak.end) {
      const durationOfABreak = activeBreak.end - currentTimestamp;
      const timerValueHelper = currentTimestamp - activeBreak.start;

      if (durationOfABreak > 0) {
        return {
          timerValueHelper,
          durationOfABreak
        };
      } else {
        this.props.deactivateBreak();

        return 0;
      }
    } else if (activeBreak && activeBreak.start) {
      return currentTimestamp - activeBreak.start;
    } else {
      return 0;
    }
  };

  componentDidMount() {
    // rerendering sometimes eats seconds, making longer timers inaccurate
    // as much as i'd like to just add seconds its too risky
    this.interval = setInterval(() => {
      this.setState(this.getState(this.props));
    }, 1000);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  };

  addZero = int => {
    if (int < 10) {
      return `0${int}`;
    }

    return `${int}`;
  };

  render() {
    return (
      <View style={{...styles.container, ...this.props.containerStyles, ...(this.props.showTimer ? {} : {marginBottom: 5, paddingBottom: 10, borderBottomWidth: 0.5, borderBottomColor: colorPrimary})}}>
        {this.props.showIcon ?
          <Text
            style={{borderBottomWidth: 2, borderColor: accentColor, fontWeight: "bold", paddingBottom: 3, fontSize: 20}}
            onPress={() => this.props.navigation.navigate("Timers", {id: this.props.activeTimer.id})}
          >
            {this.props.activeTimer.name}
          </Text>

          :

          null
        }

        <View style={{flexDirection: "row", alignItems: "center", paddingTop: this.props.showIcon ? 5 : 0}}>
          {this.props.showIcon ?
            <View style={{flexDirection: "row", alignItems: "center"}}>
              <Icon
                size={35}
                name={this.props.activeTimer.icon.icon}
                type={this.props.activeTimer.icon.type}
                color={accentColor}
                onPress={() => this.props.navigation.navigate("Timers", {id: this.props.activeTimer.id})}
              />

              <View style={{backgroundColor: accentColor, height: 2, width: 20, marginLeft: 10, marginRight: 10, borderRadius: 10}} />
            </View>

            :

            null
          }

          {this.props.activeTimer.activeBreak ?
            <Icon
              size={35}
              name='play'
              type='font-awesome'
              color={accentColor}
              onPress={() => this.props.deactivateBreak(true)}
            />

            :

            <Icon
              size={35}
              name='pause'
              type='font-awesome'
              color={accentColor}
              onPress={() => this.props.activateBreak()}
            />
          }

          <View style={{backgroundColor: accentColor, height: 2, width: 20, marginLeft: 10, marginRight: 10, borderRadius: 10}} />

          <Icon
            size={35}
            name='stop'
            type='font-awesome'
            color={accentColor}
            onPress={() => this.props.deactivateTimer()}
          />

          <View style={{flex: 1, backgroundColor: accentColor, height: 2, marginLeft: 10, marginRight: 10, borderRadius: 10}} />

          {this.props.activeTimer.activeBreak ?
            <View style={{alignItems: "flex-end"}}>
              <Text style={{fontSize: 15}}>{parseTimestamp(this.state.timer)}</Text>
              <Text style={{fontWeight: "bold", fontSize: 25}}>{parseTimestamp(this.state.activeBreak)}</Text>
            </View>

            :

            <Text style={{fontWeight: "bold", fontSize: 25}}>{parseTimestamp(this.state.timer)}</Text>
          }
        </View>
      </View>
    );
  };
};

function shouldTimerRender(props) {
  if (props.showTimer) {
    return true;
  } else {
    if (props.activeTimer) {
      const { navigation } = props;
      const isTimersDetails = navigation.state.routeName === "Timers";
      const isActiveTimerDetails = isTimersDetails ? props.activeTimer.id === navigation.state.params.id : false

      return !isActiveTimerDetails;
    }

    return false;
  }
};

const TimerTabContainer = props => {
  if (shouldTimerRender(props)) {
    return (
      <TimerTab {...props} />
    );
  }

  return null;
};

const ConnectedTimerTabContainer = connect((state, ownProps) => ({
  activeTimer: state.activeTimer
}), { deactivateTimer, activateBreak, deactivateBreak })(TimerTabContainer);

export {
  TimerTabContainer,
  ConnectedTimerTabContainer
};

const styles = {
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 10,
    padding: 5
  }
}

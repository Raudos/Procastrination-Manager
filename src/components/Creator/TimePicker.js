import React from 'react';
import { Text, View } from 'react-native';
import { WheelPicker } from 'react-native-wheel-picker-android';

// Components
import Tab from "src/components/Tab";

// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';

export default class TimePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.stateCreator(this.props);
  };

  componentWillReceiveProps(nextProps) {
    this.setState(this.stateCreator(nextProps));
  };

  stateCreator = props => {
    const { data } = props.screenProps;

    if (props.update) {
      return {
        seconds: props.data.time || 60,
        ...this.getPositions(props.data.time || 60)
      };
    }

    return {
      seconds: data.time || 60,
      ...this.getPositions(data.time || 60)
    };
  };

  getHours = () => {
    const arr = [];

    for (var i = 0; i < 24; i++) {
      arr.push(i);
    }

    return arr;
  };

  getMinutes = () => {
    const arr = [];

    for (var i = 1; i < 61; i++) {
      arr.push(i);
    }

    return arr;
  };

  getPositions = seconds => {
    const hours = Math.floor(seconds / 60 / 60);
    const minutes = seconds / 60 - hours * 60;

    return {
      hours,
      minutes
    };
  };

  updateState = (passedState, val) => {
    this.setState({
      [passedState]: val
    });
  };

  render() {
    const minutes = this.getMinutes();
    const hours = this.getHours();
    const { t } = this.props.screenProps;

    return (
      <Tab header={t(`${this.props.update ? "update" : "creation"}.${this.props.update || "BreakCreator"}.timePicker.header`)}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.header}>
              {t(`${this.props.update ? "update" : "creation"}.${this.props.update || "BreakCreator"}.timePicker.hours`)}
            </Text>

            <WheelPicker
              isCurtain
              selectedItemPosition={this.state.hours}
              onItemSelected={(event)=> this.updateState("hours", event.data)}
              isCurved
              selectedItemTextColor={accentColor}
              itemTextColor={colorSecondary}
              data={hours}
              style={styles.wheelPicker}
            />
          </View>

          <View style={styles.column}>
            <Text style={styles.header}>
              {t(`${this.props.update ? "update" : "creation"}.${this.props.update || "BreakCreator"}.timePicker.minutes`)}
            </Text>

            <WheelPicker
              isCurtain
              selectedItemPosition={this.state.minutes - 1}
              onItemSelected={(event)=> this.updateState("minutes", event.data)}
              isCurved
              selectedItemTextColor={accentColor}
              itemTextColor={colorSecondary}
              data={minutes}
              style={styles.wheelPicker}
            />
          </View>
        </View>
      </Tab>
    );
  };
};

const styles = {
  row: {
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
    paddingTop: 5,
    borderTopWidth: 0.5,
    borderTopColor: colorPrimary
  },
  column: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    alignSelf: "center",
    fontWeight: "bold",
    marginBottom: 10
  },
  wheelPicker: {
    width: 100,
    height: 130
  }
};

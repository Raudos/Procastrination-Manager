import React from "react";
import { View, Text, Button } from "react-native";
import { Icon } from 'react-native-elements';
import R from "ramda";
import PropTypes from 'prop-types';

// Components
import { ConnectedTimerTabContainer } from 'src/components/Data/Details/Timer/BasicView/TimerTab';

// Other
import { colorPrimary, colorSecondary, backgroundColor } from 'src/config/styles';

const navigationOptions = [
  "List",
  "Creator",
  "Calendar",
  "Statistics",
  "Options"
];

const icons = {
  List: "hourglass",
  Creator: "plus-square-o",
  Calendar: "calendar",
  Statistics: "table",
  Options: "cog"
};

const groupedRoutes = {
  List: ['List', "Timers", "Breaks", "Tags"],
  Creator: ["Creator", "TimerCreator", "TagCreator", "BreakCreator"],
  Calendar: ["Calendar"],
  Statistics: ["Statistics"],
  Options: ["Options"]
};

const NavigationButton = props => {
  return (
    <View>
      <Icon
        name={icons[props.routeName]}
        type='font-awesome'
        color={groupedRoutes[props.routeName].includes(props.navigation.state.routeName) ? colorPrimary : colorSecondary}
        onPress={() => {
          if (props.navigation.state.routeName !== props.routeName) {
            props.navigation.navigate(props.routeName)
          }
        }}
      />

      <Text style={styles.textStyle}>{props.screenProps.t(`navigation.${props.routeName}`)}</Text>
    </View>
  )
}

const Navigation = props => {
  return (
    <View style={styles.container}>
      <ConnectedTimerTabContainer {...props} containerStyles={{marginBottom: 0, padding: 5}} showIcon />

      <View style={{flexDirection: "row", justifyContent: "space-around", paddingTop: 5}}>
        {navigationOptions.map(route => {
          return (
            <NavigationButton key={route} {...props} routeName={route} />
          )
        })}
      </View>
    </View>
  );
};

Navigation.propTypes = {
  navigation: PropTypes.object.isRequired,
  screenProps: PropTypes.shape({
    t: PropTypes.func.isRequired
  })
};

export default Navigation;

const styles ={
  container: {
    backgroundColor: backgroundColor,
    padding: 5,
    borderTopWidth: 0.8,
    borderTopColor: colorPrimary
  },
  containerActive: {
    backgroundColor: backgroundColor,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  textStyle: {
    fontSize: 10,
    alignSelf: 'center'
  }
}

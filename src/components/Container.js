import React from "react";
import { View, Text } from "react-native";
import PropTypes from 'prop-types';

// Components
import Navigation from "src/components/Navigation/index";

// Other
import { colorPrimary, colorSecondary, backgroundColor } from 'src/config/styles';

const DetailsRoutes = ["Timers", "Breaks", "Tags"];

export default class Container extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.shape({
      t: PropTypes.func.isRequired,
      reduxNavigation: PropTypes.object.isRequired
    })
  };

  shouldComponentUpdate(nextProps) {
    try {
      const currentActiveRoute = nextProps.screenProps.reduxNavigation.routes.slice(-1)[0];
      const containerRoute = this.props.navigation.state;

      return currentActiveRoute.params.timestamp === containerRoute.params.timestamp;
    } catch(e) {
      // Should only be triggered by Start route
      return true;
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: colorSecondary}}>
        <View style={{flex: 1}}>
          {this.props.children}
        </View>

        <Navigation {...this.props} />
      </View>
    );
  };
};

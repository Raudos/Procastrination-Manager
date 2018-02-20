import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';
import PropTypes from 'prop-types';

// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

export default class TabViewExample extends React.Component {
  static propTypes = {
    tabs: PropTypes.array.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      routes: this.props.tabs
    };
  };

  handleIndexChange = index => this.setState({ index });

  renderHeader = props => (
    <TabBar
      {...props}
      indicatorStyle={{
        backgroundColor,
        height: 4,
        bottom: 0,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
      }}
      style={{
        backgroundColor: colorPrimary,
        borderBottomColor: backgroundColor,
        borderBottomWidth: 1
      }}
      labelStyle={{
        margin: 4,
        fontSize: 18,
        color: backgroundColor
      }}
    />
  );

  renderScene = ({ route, index }) => {
    const PickedComponent = this.props.components[route.key] || null;

    return <PickedComponent {...this.props} activeTab={route.key} currentComponent={this.props.tabs[this.state.index].key} />
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        onIndexChange={this.handleIndexChange}
        initialLayout={initialLayout}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

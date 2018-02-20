import React from "react";
import { View, Text } from "react-native";
import { StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';

// Components
import Name from "src/components/Creator/Name";
import Icon from "src/components/Creator/Icon";
import TagsNBreaks from "src/components/Creator/TagsNBreaks";

const States = {
  Name,
  Icon,
  TagsNBreaks
};

export default class CreatorStateHandler extends React.Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired
  };

  state = {
    component: "Name"
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.currentComponent === "TimersCreator") {
      if (nextProps.activeTab === nextProps.currentComponent) {
        return true;
      }

      return this.props.tags.length !== nextProps.tags.length || this.props.breaks.length !== nextProps.breaks.length;
    }

    return nextProps.activeTab === nextProps.currentComponent;
  };

  changeComponent = component => this.setState({component})

  render() {
    const PickedComponent = States[this.state.component]

    return (
      <PickedComponent
        navigation={this.props.navigation}
        changeComponent={this.changeComponent}
        screenProps={{
          mode: this.props.activeTab,
          data: this.props.creator[this.props.activeTab],
          tags: this.props.tags,
          breaks: this.props.breaks,
          updateCreator: this.props.updateCreator,
          finishCreation: this.props.finishCreation,
          t: this.props.screenProps.t
        }}
      />
    );
  };
};

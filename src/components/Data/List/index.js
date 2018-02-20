import React from "react";
import { View, Text, TouchableOpacity, Dimensions, FlatList } from "react-native";
import R from "ramda";
import { Icon } from 'react-native-elements';
import { StackNavigator } from 'react-navigation';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

// Components
import Container from "src/components/Container";
import TabChanger from "src/components/TabChanger";
import TimersList from "src/components/Data/List/Timer/index";
import TagsList from "src/components/Data/List/Tag/index";
import BreaksList from "src/components/Data/List/Break/index";

const Components = {
  Timers: TimersList,
  Breaks: BreaksList,
  Tags: TagsList
};

const connectedList = props => {
  const List = connect((state, ownProps) => ({
    data: state.data[props.activeTab.toLowerCase()]
  }), { })(Components[props.activeTab]);

  return <List {...props} />;
};

const List = props => {
  const { t } = props.screenProps;

  return (
    <Container {...props}>
      <TabChanger
        {...props}
        tabs={[
          {key: 'Timers', title: t("tabs.timers")},
          {key: 'Breaks', title: t("tabs.breaks")},
          {key: 'Tags', title: t("tabs.tags")}
        ]}
        components={{
          Timers: connectedList,
          Breaks: connectedList,
          Tags: connectedList
        }}
      />
    </Container>
  );
};

List.propTypes = {
  screenProps: PropTypes.shape({
    t: PropTypes.func.isRequired,
  })
}

export default List;

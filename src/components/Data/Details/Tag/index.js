import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

// Components
import Container from "src/components/Container";
import BasicView from "src/components/Data/Details/Tag/BasicView/index";
import Statistics from "src/components/Data/Details/Tag/Statistics/index";
import TabChanger from "src/components/TabChanger";

// Other
import { updateData, deleteData } from "src/redux/actions/data/index";

function showStatistics(timers, timerIds) {
  if (timerIds && timerIds.length) {
    const tagTimers = timers.filter(timer => timerIds.includes(timer.id));

    for (let i = 0; i < tagTimers.length; i++) {
      if (tagTimers[i].timestamps.length) {
        return true;
      }
    }
  }

  return false;
};

const TagDetails = props => {
  if (props.chosenData) {
    if (showStatistics(props.data.timers, props.chosenData.timers)) {
      const { t } = props.screenProps;

      return (
        <Container {...props}>
          <TabChanger
            {...props}
            tabs={[
              {key: 'Details', title: t("tabs.details")},
              {key: 'Statistics', title: t("tabs.stats")}
            ]}
            components={{
              Details: BasicView,
              Statistics: Statistics
            }}
          />
        </Container>
      );
    }

    return (
      <Container {...props}>
        <BasicView {...props} />
      </Container>
    );
  }

  return null;
};

TagDetails.propTypes = {
  activeTimer: PropTypes.object,
  data: PropTypes.object.isRequired,
  deleteData: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  screenProps: PropTypes.shape({
    t: PropTypes.func.isRequired
  })
};

export default connect((state, ownProps) => ({
  data: {
    timers: state.data.timers,
    tags: state.data.tags
  },
  chosenData: state.data[ownProps.navigation.state.routeName.toLowerCase()].filter(obj => obj.id === ownProps.navigation.state.params.id)[0]
}), { updateData, deleteData })(TagDetails);

import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

// Components
import Container from "src/components/Container";
import TabChanger from "src/components/TabChanger";
import BasicView from "src/components/Data/Details/Timer/BasicView/index";
import Statistics from "src/components/Data/Details/Timer/Statistics/index";

// Other
import { updateData, deleteData, deleteActivity } from "src/redux/actions/data/index";
import { activateTimer, deactivateTimer, activateBreak, deactivateBreak } from "src/redux/actions/activeTimer/index";

const TimerDetails = props => {
  if (props.chosenData) {
    if (props.chosenData.timestamps && props.chosenData.timestamps.length) {
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

  // TODO add no data component
  return null;
};

TimerDetails.propTypes = {
  activeTimer: PropTypes.object,
  data: PropTypes.object.isRequired,
  deleteActivity: PropTypes.func.isRequired,
  deactivateBreak: PropTypes.func.isRequired,
  deactivateTimer: PropTypes.func.isRequired,
  activateBreak: PropTypes.func.isRequired,
  activateTimer: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
  updateData: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  screenProps: PropTypes.shape({
    t: PropTypes.func.isRequired
  })
};

export default connect((state, ownProps) => ({
  activeTimer: state.activeTimer,
  data: state.data,
  chosenData: state.data[ownProps.navigation.state.routeName.toLowerCase()].filter(obj => obj.id === ownProps.navigation.state.params.id)[0] || null
}), { activateTimer, updateData, deleteData, deleteActivity, deactivateTimer, activateBreak, deactivateBreak })(TimerDetails);

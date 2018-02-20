import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

// Components
import Container from "src/components/Container";
import Tab from "src/components/Tab";
import Agenda from "src/components/Calendar/Agenda";

// Other
import { deleteActivity } from "src/redux/actions/data/index";

const CalendarContainer = props => {
  return (
    <Container {...props}>
      <Agenda {...props} />
    </Container>
  );
};

CalendarContainer.propTypes = {
  data: PropTypes.object.isRequired,
  deleteActivity: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
  screenProps: PropTypes.shape({
    t: PropTypes.func.isRequired
  })
};

export default connect((state, ownProps) => ({
  data: state.data
}), { deleteActivity })(CalendarContainer)

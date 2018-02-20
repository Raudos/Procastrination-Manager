import React from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

// Components
import Container from "src/components/Container";
import Name from "src/components/Data/Details/Break/NameTab";
import Timers from 'src/components/Data/Details/Break/TimerTab';
import Duration from 'src/components/Data/Details/Break/DurationTab';

// Other
import { updateData, deleteData } from "src/redux/actions/data/index";

const BreakDetails = props => {
  if (props.chosenData) {
    return (
      <Container {...props} >
        <View style={{flex: 1, padding: 5}}>
          <Name {...props} />

          <Duration {...props} />

          <Timers {...props} searchFor="breaks" />
        </View>
      </Container>
    );
  }

  return null;
};

BreakDetails.propTypes = {
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
    tags: state.data.tags,
    breaks: state.data.breaks
  },
  chosenData: state.data[ownProps.navigation.state.routeName.toLowerCase()].filter(obj => obj.id === ownProps.navigation.state.params.id)[0]
}), { updateData, deleteData })(BreakDetails);

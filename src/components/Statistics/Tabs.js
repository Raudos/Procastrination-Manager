import React from "react";
import R from "ramda";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

// Components
import Container from "src/components/Container";
import TabChanger from "src/components/TabChanger";
import Statistics from 'src/components/Statistics/index';

const List = props => {
  const { t } = props.screenProps;

  return (
    <Container {...props}>
      <TabChanger
        {...props}
        scrollEnabled={true}
        tabs={[
          {key: 'All', title: "All Time"},
          {key: 'Week', title: "Last 7 days"},
          {key: 'Month', title: "Last 30 days"}
        ]}
        components={{
          All: Statistics,
          Week: Statistics,
          Month: Statistics
        }}
      />
    </Container>
  );
};

List.propTypes = {
  data: PropTypes.object.isRequired,
  screenProps: PropTypes.shape({
    t: PropTypes.func.isRequired
  })
};

export default connect((state, ownProps) => ({
  data: state.data
}), { })(List);

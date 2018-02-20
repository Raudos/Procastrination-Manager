import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

// Components
import Container from "src/components/Container";
import CreationStateHandler from "src/components/Creator/CreationStateHandler";
import TabChanger from "src/components/TabChanger";

// Other
import { updateCreator, finishCreation } from "src/redux/actions/creator/index";

class CreatorContainer extends React.Component {
  static propTypes = {
    updateCreator: PropTypes.func.isRequired,
    finishCreation: PropTypes.func.isRequired,
    creator: PropTypes.object.isRequired,
    tags: PropTypes.array,
    breaks: PropTypes.array
  };

  render() {
    return (
      <Container {...this.props}>
        <TabChanger
          {...this.props}
          tabs={[
            {key: 'TimerCreator', title: 'Timers'},
            {key: 'BreakCreator', title: 'Breaks'},
            {key: 'TagCreator', title: 'Tags'}
          ]}
          components={{
            TimerCreator: CreationStateHandler,
            BreakCreator: CreationStateHandler,
            TagCreator: CreationStateHandler
          }}
        />
      </Container>
    );
  };
};

export default connect((state, ownProps) => ({
  creator: state.creator,
  tags: state.data.tags,
  breaks: state.data.breaks
}), { updateCreator, finishCreation })(CreatorContainer)

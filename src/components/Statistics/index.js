import React from "react";
import { View, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import PropTypes from 'prop-types';

// Components
import Container from "src/components/Container";
import TimersPieChart from "src/components/Statistics/TimersPieChart";
import TimersAndBreaks from "src/components/Statistics/TimersAndBreaks";
import TagsDuration from "src/components/Statistics/TagsDuration";
import Tooltip from "src/components/Creator/Tooltip";

// Other
import { colorPrimary, colorSecondary, backgroundColor } from 'src/config/styles';
import getRandomColor from "src/reusables/randomColor";

function showStatistics(timers) {
  for (let i = 0; i < timers.length; i++) {
    if (timers[i].timestamps.length) {
      return true;
    }
  }

  return false;
};

const Statistics = props => {
  if (showStatistics(props.data.timers)) {
    const data = props.data.timers.map(timer => {
      if (timer.timestamps && timer.timestamps.length) {
        return {
          ...timer,
          ...timer.timestamps.reduce((prev, curr) => {
            return {
              activitiesDuration: prev.activitiesDuration + (curr.end - curr.start),
              breaksDuration: prev.breaksDuration + (curr.usedBreaks.length ? curr.usedBreaks.reduce((prev, curr) => prev + (curr.end - curr.start), 0) : 0)
            };
          }, {
            activitiesDuration: 0,
            breaksDuration: 0
          }),
          color: getRandomColor()
        };
      }

      return {
        ...timer,
        color: getRandomColor(),
        activitiesDuration: 0,
        breaksDuration: 0
      }
    });

    return (
      <Container {...props}>
        <View style={{flex: 1, padding: 5, backgroundColor: colorSecondary}}>
          <ScrollView>
            <TimersPieChart data={data} navigation={props.navigation} t={props.screenProps.t} />

            <TimersPieChart data={data} navigation={props.navigation} countBreaks t={props.screenProps.t} />

            <TagsDuration data={data} tags={props.data.tags} navigation={props.navigation} t={props.screenProps.t} />

            <TimersAndBreaks data={data} navigation={props.navigation} t={props.screenProps.t} />
          </ScrollView>
        </View>
      </Container>
    );
  }

  return (
    <Container {...props}>
      <View style={{padding: 5}}>
        <Tooltip text={props.screenProps.t(`tooltips.creation.TimerCreator`)}/>
      </View>
    </Container>
  );
};

Statistics.propTypes = {
  data: PropTypes.object.isRequired,
  screenProps: PropTypes.shape({
    t: PropTypes.func.isRequired,
  })
};

export default connect((state, ownProps) => ({
  data: state.data
}), { })(Statistics);

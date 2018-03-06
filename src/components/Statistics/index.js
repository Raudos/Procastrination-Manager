import React from "react";
import { View, Text, ScrollView } from "react-native";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import Container from "src/components/Container";
import TimersPieChart from "src/components/Statistics/TimersPieChart";
import TimersAndBreaks from "src/components/Statistics/TimersAndBreaks";
import TagsDuration from "src/components/Statistics/TagsDuration";
import Tooltip from "src/components/Creator/Tooltip";

// Other
import { colorPrimary, colorSecondary, backgroundColor } from 'src/config/styles';
import { parseTimestamp } from "src/reusables/time";

function filterTimers(timers = [], option = "All") {
  const filters = {
    Week: timestamp => {
      const momentTimestamp = moment(parseTimestamp(timestamp.start, "agendaFormat"));

      return !moment().subtract(7, 'days').isAfter(momentTimestamp);
    },
    Month: timestamp => {
      const momentTimestamp = moment(parseTimestamp(timestamp.start, "agendaFormat"));

      return !moment().subtract(1, "month").isAfter(momentTimestamp);
    }
  };

  if (option === "All") {
    return timers;
  } else {
    return timers.filter(filters[option]);
  }
};

function prepareTimers(props) {
  if (props.data.timers && props.data.timers.length) {
    const timers = props.data.timers.map(timer => {
      if (timer.timestamps && timer.timestamps.length) {
        return {
          ...timer,
          ...filterTimers(timer.timestamps, props.activeTab).reduce((prev, curr) => {
            return {
              activitiesDuration: prev.activitiesDuration + (curr.end - curr.start),
              breaksDuration: prev.breaksDuration + (curr.usedBreaks.length ? curr.usedBreaks.reduce((prev, curr) => prev + (curr.end - curr.start), 0) : 0)
            };
          }, {
            activitiesDuration: 0,
            breaksDuration: 0
          })
        };
      }

      return {
        ...timer,
        activitiesDuration: 0,
        breaksDuration: 0
      };
    });

    return timers;
  }

  return [];
};


function showStatistics(timers) {
  for (let i = 0; i < timers.length; i++) {
    if (timers[i].timestamps.length) {
      return true;
    }
  }

  return false;
};

const Statistics = props => {
  const filteredTimers = prepareTimers(props);

  if (showStatistics(filteredTimers)) {
    return (
      <View style={{flex: 1, padding: 5, backgroundColor: colorSecondary}}>
        <ScrollView>
          <TimersPieChart data={filteredTimers} navigation={props.navigation} t={props.screenProps.t} />

          <TimersPieChart data={filteredTimers} navigation={props.navigation} countBreaks t={props.screenProps.t} />

          <TagsDuration data={filteredTimers} tags={props.data.tags} navigation={props.navigation} t={props.screenProps.t} />

          <TimersAndBreaks data={filteredTimers} navigation={props.navigation} t={props.screenProps.t} />
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={{padding: 5}}>
      <Tooltip text={props.screenProps.t(`tooltips.creation.TimerCreator`)}/>
    </View>
  );
};

Statistics.propTypes = {
  data: PropTypes.object.isRequired,
  screenProps: PropTypes.shape({
    t: PropTypes.func.isRequired,
  })
};

export default Statistics;

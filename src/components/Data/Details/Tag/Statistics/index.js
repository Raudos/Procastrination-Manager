import React from "react";
import { View, ScrollView } from "react-native";

// Components
import TimersPieChart from "src/components/Statistics/TimersPieChart";

// Other
import getRandomColor from "src/reusables/randomColor";

export default props => {
  const data = props.data.timers.filter(timer => props.chosenData.timers.includes(timer.id)).map(timer => {
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
    <View style={{flex: 1, padding: 5}}>
      <ScrollView>
        <TimersPieChart data={data} navigation={props.navigation} t={props.screenProps.t} />

        <TimersPieChart data={data} navigation={props.navigation} countBreaks t={props.screenProps.t} />
      </ScrollView>
    </View>
  )
}

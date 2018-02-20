import React from "react";
import { G, Line, Text as TextSvg } from 'react-native-svg';
import { PieChart } from 'react-native-svg-charts';
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

// Components
import Tab from "src/components/Tab";

// Other
import { parseTimestamp } from "src/reusables/time";
import { colorPrimary, colorSecondary, backgroundColor, accentColor} from 'src/config/styles';
import getRandomColor from "src/reusables/randomColor";

const MyPieChart = props => {
  const pieData = props.summedTimers.filter(value => value.summedDuration > 0)
    .map((value, index) => ({
        value: (value.summedDuration / props.allActivities) * 100,
        color: value.color,
        key: `pie-${index}`,
        onPress: data => props.navigation.navigate("Timers", {id: value.id})
    }));

  return (
    <PieChart
      style={{height: 250}}
      data={pieData}
      innerRadius={50}
      outerRadius={85}
      labelRadius={110}
      renderDecorator={ ({ item, pieCentroid, labelCentroid, index }) => {
        if (item.value >= 5) {
          return (
            <G key={index}>
              <Line
                x1={labelCentroid[0]}
                y1={labelCentroid[1]}
                x2={pieCentroid[0]}
                y2={pieCentroid[1]}
                stroke={item.color}
              />
              <TextSvg
                x={labelCentroid[0] - 20}
                y={labelCentroid[1] >= 0 ? labelCentroid[1] + 15 : labelCentroid[1] - 5}
                fontSize="15"
                fonWeight="bold"
                fill={item.color}
              >
                {`${Math.floor(item.value)}%`}
              </TextSvg>
            </G>
          )
        }

        return null;
      }}
    />
  );
};

export default props => {
  const summedAndSortedTimers = props.data.map(timer => {
    return {
      ...timer,
      summedDuration: props.countBreaks ? timer.activitiesDuration - timer.breaksDuration : timer.activitiesDuration
    };
  }).sort((a, b) => b.summedDuration - a.summedDuration);
  const allActivities = summedAndSortedTimers.reduce((prev, curr) => prev + curr.summedDuration, 0);

  return (
    <Tab header={props.countBreaks ? props.t("statistics.activitiesDura") : props.t("statistics.activitiesWithBreaksDura")}>
      <View style={{marginTop: 5, paddingTop: 5, borderTopWidth: 0.5, borderTopColor: colorPrimary}}>
        <MyPieChart
          summedTimers={summedAndSortedTimers}
          allActivities={allActivities}
          navigation={props.navigation}
        />

        <View style={{marginTop: 5, paddingTop: 5, borderTopWidth: 0.5, borderTopColor: colorPrimary}}>
          <ScrollView horizontal>
            {summedAndSortedTimers.map((timer, index) => {
              return (
                <TouchableOpacity style={{flexDirection: "row", alignItems: "center", elevation: 2, marginBottom: 5, marginRight: 15}} key={timer.id} onPress={() => props.navigation.navigate("Timers", {id: timer.id})}>
                  <Text style={{marginRight: 10, fontWeight: "bold", color: timer.color, fontSize: 22}}>{`${index + 1}.`}</Text>
                  <View>
                    <Text style={{fontWeight: "bold", paddingBottom: 3, borderBottomWidth: 0.5, borderBottomColor: colorPrimary, marginBottom: 3}}>{timer.name}</Text>
                    <Text style={{fontSize: 12}}>{parseTimestamp(timer.summedDuration)}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
      </View>
    </Tab>
  );
};

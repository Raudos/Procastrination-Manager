import React from "react";
import { View, Text, ScrollView } from "react-native";
import { G, Line, Text as TextSvg } from 'react-native-svg';
import { PieChart } from 'react-native-svg-charts';
// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor} from 'src/config/styles';

// Components
import Tab from "src/components/Tab";

const MyPieChart = props => {
  const activityDuration = props.chosenData.timestamps.reduce((prev, curr) => prev + (curr.end - curr.start), 0);
  const breaksDuration = props.chosenData.timestamps.reduce((prev, curr) => {
    if (curr.usedBreaks && curr.usedBreaks.length) {
      return prev + curr.usedBreaks.reduce((prev, curr) => curr.end - curr.start, 0);
    }

    return prev;
  }, 0);
  const fullDuration = activityDuration + breaksDuration;

  const pieData = [{
    value: activityDuration,
    color: accentColor,
    key: "key-0"
  }, {
    value: breaksDuration,
    color: colorPrimary,
    key: "key-1"
  }];

  return (
    <PieChart
      style={{height: 270}}
      data={pieData}
      innerRadius={50}
      outerRadius={85}
      labelRadius={110}
      renderDecorator={ ({ item, pieCentroid, labelCentroid, index }) => {
        const percentage = ((item.value / fullDuration) * 100).toFixed(2);

        if (percentage >= 5) {
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
                {`${percentage}%`}
              </TextSvg>
            </G>
          )
        }

        return null;
      }}
    />
  );
};

export default props => (
  <Tab header={props.screenProps.t("data.timers.statistics.chartHeader")}>
    <View style={{marginTop: 5,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: colorPrimary}}>
      <MyPieChart {...props} />

    </View>
  </Tab>
);

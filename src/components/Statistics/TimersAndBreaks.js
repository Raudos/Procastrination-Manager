import React from 'react'
import { ScrollView, View } from "react-native";
import { BarChart } from 'react-native-svg-charts';
import { G, Line, Text as TextSvg, Circle } from 'react-native-svg';

// Components
import Tab from "src/components/Tab";

// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';

export default props => {
  const newData = props.data.concat().sort((a, b) => b.breaksDuration - a.breaksDuration);
  const barData = [{
    values: newData.map(obj => obj.breaksDuration),
    positive: {
      fill: colorPrimary
    },
    negative: {
      fill: "red"
    }
  }, {
    values: newData.map(obj => obj.activitiesDuration),
    positive: {
      fill: accentColor
    },
    negative: {
      fill: "red"
    }
  }];

  return (
    <Tab header={props.t("statistics.breaksPercentage")}>
      <View style={{marginTop: 5, paddingTop: 5, borderTopWidth: 0.5, borderTopColor: colorPrimary}}>
        <ScrollView horizontal>
          <BarChart
            showGrid={false}
            spacing={0.5}
            style={{height: 200, width: newData.length ? newData.length * 80 : 0}}
            data={barData}
            contentInset={{top: 5, bottom: 90, left: 0, right: 40}}
            renderDecorator={({ x, y, index, value }) => {
              const timer = newData[index];
              return (
                [<TextSvg
                  key={1}
                  x={x(index) - 1}
                  y={y(value) - 5}
                  fontSize="10"
                  fonWeight="bold"
                  fill={colorPrimary}
                >
                  {`${Math.floor((timer.breaksDuration / timer.activitiesDuration) * 100 || 0)}%`}
                </TextSvg>,
                <TextSvg
                  key={2}
                  x={x(index)}
                  y={175 + (index%2 ? 20 : 0)}
                  fontSize="13"
                  fonWeight="bold"
                  fill={colorPrimary}
                >
                  {timer.name}
                </TextSvg>]
              );
            }}
          />
        </ScrollView>
      </View>
    </Tab>
  );
};

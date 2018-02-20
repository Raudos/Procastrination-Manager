import React from 'react'
import { StackedBarChart } from 'react-native-svg-charts'
import { ScrollView, View } from "react-native";
import { G, Line, Text as TextSvg, Circle } from 'react-native-svg';
import R from "ramda";

// Components
import Tab from "src/components/Tab";

// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';
import getRandomColor from "src/reusables/randomColor";
import { parseTimestamp } from "src/reusables/time";

export default props => {
  function getTagsDuration(data) {
    function sortTagsObject(tags) {
      // Order of keys is a way of sorting in this case
      const entries = Object.entries(tags);
      entries.sort((a, b) => sumObjValues(b[1]) - sumObjValues(a[1]))

      return entries;
    };

    function sumObjValues(obj) {
      return R.sum(Object.values(obj));
    };

    const tags = {};

    data.forEach(timer => {
      if (timer.tags && timer.tags.length) {
        // Graph cant have null values, needed to add zeroes for each viable timer ID so it would not crash
        timer.tags.forEach(tagId => {
          if (tags[tagId]) {
            tags[tagId][timer.id] = timer.activitiesDuration;
          } else {
            tags[tagId] = {};

            props.data.forEach(timer => {tags[tagId][timer.id] = 0});
            tags[tagId][timer.id] = timer.activitiesDuration;
          }
        });
      }
    });

    const sortedTags = sortTagsObject(tags);

    return sortedTags;
  };

  // Create a sorted array consisting of tag id and list of timers associated with it
  const sortedAndSummedTags = getTagsDuration(props.data);
  // Get list of all used Timer ids
  const usableIds = Object.keys(sortedAndSummedTags.reduce((prev, curr) => Object.assign(prev, curr[1]), {}));
  // Based on usableIds get list of all colors for each Timer
  const colors = props.data.filter(timer => usableIds.includes(timer.id)).map(timer => timer.color);
  const columnWidth = 80;

  return (
    <Tab header={props.t("statistics.tagsDura")}>
      <View style={{marginTop: 5, paddingTop: 5, borderTopWidth: 0.5, borderTopColor: colorPrimary}}>
        <ScrollView horizontal>
          <StackedBarChart
            style={{height: 200, width: sortedAndSummedTags.length ? sortedAndSummedTags.length * columnWidth : 0}}
            keys={usableIds}
            colors={colors}
            data={sortedAndSummedTags.map(arr => arr[1])}
            showGrid={false}
            contentInset={{top: 40, bottom: 40}}
            renderDecorator={(bar, index) => {
              if (index < sortedAndSummedTags.length) {
                let usedTag = props.tags.filter(obj => obj.id == sortedAndSummedTags[index][0])[0];

                return (
                  [<TextSvg
                    key={0}
                    x={columnWidth * index + columnWidth / 2}
                    y={20}
                    fontSize="15"
                    fonWeight="bold"
                    fill={colorPrimary}
                    textAnchor="middle"
                  >
                    {sortedAndSummedTags[index] ? parseTimestamp(R.sum(Object.values(sortedAndSummedTags[index][1]))) : null}
                  </TextSvg>,
                  <TextSvg
                    key={1}
                    x={columnWidth * index + columnWidth / 2}
                    y={175 + (index%2 ? 20 : 0)}
                    fontSize="13"
                    fonWeight="bold"
                    fill={colorPrimary}
                    textAnchor="middle"
                  >
                    {usedTag ? usedTag.name : null}
                  </TextSvg>]
                );
              }

              return null;
            }}
          />
        </ScrollView>
      </View>
    </Tab>
  );
};

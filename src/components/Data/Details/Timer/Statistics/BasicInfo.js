import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';

// Components
import Tab from "src/components/Tab";

// Other
import { parseTimestamp } from "src/reusables/time";
import { colorPrimary, colorSecondary, backgroundColor, accentColor} from 'src/config/styles';

export default props => {
  const { timestamps } = props.chosenData;
  const { t } = props.screenProps;
  const averageDuration = timestamps.length ? timestamps.reduce((prev, curr) => prev + curr.end - curr.start, 0) / timestamps.length : 0;
  const averageBreak = timestamps.length ? timestamps.reduce((prev, curr) => {
    if (curr.usedBreaks.length) {
      return prev + curr.usedBreaks.reduce((prev, curr) => prev + curr.end - curr.start, 0)
    }

    return prev
  }, 0) / timestamps.length : 0;

  return (
    <Tab>
      <View style={{flexDirection: 'row', alignItems: "center"}}>
        <Icon
          name={"clock-o"}
          type={"font-awesome"}
          color={accentColor}
          size={25}
        />

        <View style={{flex: 1, marginLeft: 10}}>
          <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "space-between"}}>
            <Text style={{fontWeight: "bold", fontSize: 15, marginRight: 5}}>{t("data.timers.statistics.avgDura")}</Text>
            <Text style={{fontSize: 15}}>{parseTimestamp(averageDuration)}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "space-between"}}>
            <Text style={{fontWeight: "bold", fontSize: 15, marginRight: 5}}>{t("data.timers.statistics.avgBreak")}</Text>
            <Text style={{fontSize: 15}}>{averageBreak ? parseTimestamp(averageBreak) : "- - -"}</Text>
          </View>
        </View>
      </View>
    </Tab>
  )
}

import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Icon } from 'react-native-elements';

// Components
import Tab from "src/components/Tab";

// Other
import { parseTimestamp } from "src/reusables/time";
import { colorPrimary, colorSecondary, backgroundColor, accentColor} from 'src/config/styles';

const Activity = props => {
  const breaksDuration = props.data.usedBreaks.reduce((prev, curr) => {
    return prev + curr.end - curr.start;
  }, 0);

  return (
    <View style={{elevation: 2, borderWidth: 1, borderColor: colorSecondary, backgroundColor: colorSecondary, borderRadius: 10, padding: 3, marginBottom: 10}}>
      <View style={{flexDirection: 'row', alignItems: "center", borderBottomColor: accentColor, borderBottomWidth: 0.5, marginBottom: 5, paddingVertical: 5, justifyContent: "space-between"}}>
        <View style={{flexDirection: 'row', alignItems: "center"}}>
          <Text style={{fontWeight: "bold", fontSize: 15, marginRight: 5}}>{props.t("data.timers.statistics.started")}</Text>
          <Text style={{fontSize: 15}}>{parseTimestamp(props.data.start, "fullDate")}</Text>
        </View>

        <Icon
          name={"calendar"}
          type={"font-awesome"}
          color={accentColor}
          size={20}
        />
      </View>

      <View style={{flexDirection: 'row', alignItems: "center"}}>
        {props.hideDelete ?
          null

          :

          <Icon
            size={25}
            name="trash"
            type='font-awesome'
            color={colorPrimary}
            onPress={() => props.deleteActivity(props.timerId, props.data.id)}
          />
        }

        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "flex-end"}}>
            <Text style={{fontWeight: "bold", fontSize: 15, marginRight: 5}}>{props.t("data.timers.statistics.activityDura")}</Text>
            <Text style={{fontSize: 15}}>{parseTimestamp(props.data.end - props.data.start)}</Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: "center", justifyContent: "flex-end"}}>
            <Text style={{fontWeight: "bold", fontSize: 15, marginRight: 5}}>{props.t("data.timers.statistics.breakDura")}</Text>
            <Text style={{fontSize: 15}}>{breaksDuration ? parseTimestamp(breaksDuration) : "- - -"}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const List = props => {
  // TODO Add filters and pagination
  return (
    <Tab header="All Activities">
      <View style={{marginTop: 5, paddingTop: 10, borderTopWidth: 0.5, borderTopColor: colorPrimary}}>
        {props.chosenData.timestamps.map((obj, index) => <Activity data={obj} key={`${index}-${obj.start}`} t={props.screenProps.t} />)}
      </View>
    </Tab>
  );
};

export { List, Activity };

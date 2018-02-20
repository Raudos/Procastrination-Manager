import React from "react";
import { View, Text, ScrollView, Dimensions, Switch } from "react-native";
import { Icon } from 'react-native-elements';

// Components
import Tab from "src/components/Tab";
import { Activity } from "src/components/Data/Details/Timer/Statistics/ActivitiesList";

// Other
import { parseTimestamp } from "src/reusables/time";
import { colorPrimary, colorSecondary, backgroundColor, accentColor} from 'src/config/styles';

const TimestampButton = props => {
  const summedBreaks = props.timestampData.usedBreaks ? props.timestampData.usedBreaks.reduce((prev, curr) => {
    return prev + (curr.end - curr.start);
  }, 0) : 0;

  return (
    <View style={{elevation: 2, borderWidth: 1, borderColor: colorSecondary, backgroundColor: colorSecondary, borderRadius: 10, flexDirection: "row", alignItems: "center", padding: 3, marginBottom: props.active ? 5 : 10, marginRight: props.active ? 10 : 0}}>
      <Icon
        name={"clock-o"}
        type={"font-awesome"}
        color={accentColor}
        containerStyle={{marginRight: 10}}
        size={25}
      />

      <Text style={{fontSize: 15}}>{parseTimestamp((props.timestampData.end - props.timestampData.start) - summedBreaks)}</Text>

      <View style={{flex: 1, backgroundColor: accentColor, height: 2, marginLeft: 20, marginRight: 20, borderRadius: 10}}/>

      <Text style={{fontSize: 15}}>{parseTimestamp(props.timestampData.start, "fullDate")}</Text>

      <Icon
        name={"calendar"}
        type={"font-awesome"}
        color={accentColor}
        containerStyle={{marginLeft: 10}}
        size={25}
      />
    </View>
  )
}

export default props => {
  var timestamps = props.timerData.timestamps ? props.timerData.timestamps.concat().sort((a, b) => b.start - a.start) : [];

  return (
    <Tab header={props.active ? props.screenProps.t("data.timers.timestamps.headers.active") : props.screenProps.t("data.timers.timestamps.headers.normal")}>
      {props.active ?
        <View>
          {timestamps.length ?
            <Activity data={timestamps[0]} hideDelete t={props.screenProps.t} />

            :

            null
          }
        </View>

        :

        <View style={{marginTop: 5, paddingTop: 10, borderTopWidth: 0.5, borderTopColor: colorPrimary}}>
          {props.timerData.timestamps && props.timerData.timestamps.length ?
            null

            :

            <Text>{props.screenProps.t("data.timers.timestamps.placeholder")}</Text>
          }

          {timestamps.length ?
            <Activity data={timestamps[0]} timerId={props.timerData.id} deleteActivity={props.deleteActivity} t={props.screenProps.t} />

            :

            null
          }
        </View>
      }
    </Tab>
  );
}

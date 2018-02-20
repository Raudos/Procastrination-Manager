import React from "react";
import { View } from "react-native";

// Components
import Name from "src/components/Data/Details/Break/NameTab";
import Timers from 'src/components/Data/Details/Break/TimerTab';

export default props => {
  return (
    <View style={{flex: 1, padding: 5}}>
      <Name {...props} mode="tag" t={props.screenProps.t} />

      <Timers {...props} searchFor="tags" t={props.screenProps.t} />
    </View>
  )
};

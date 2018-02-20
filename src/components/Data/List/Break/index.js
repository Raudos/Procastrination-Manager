import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import R from "ramda";
import { Icon } from 'react-native-elements';

// Components
import Tab from "src/components/Tab";
import TimersList from "src/components/Data/List/Timer/index";

// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';
import { parseTimestamp } from "src/reusables/time";

const BreakRow = props => (
  <Tab>
    <TouchableOpacity style={{padding: 5, flexDirection: "row", alignItems: "center"}} onPress={() => props.navigation.navigate("Breaks", {id: props.data.id})}>
      <Icon
        name={props.data.icon.icon}
        type={props.data.icon.type}
        color={accentColor}
        size={50}
      />

      <View style={{marginLeft: 20, flex: 1}}>
        <Text style={{borderBottomWidth: 1, borderBottomColor: accentColor, paddingBottom: 5, marginBottom: 5, fontWeight: "bold", fontSize: 20}}>{props.data.name}</Text>

        <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-end"}}>
          <Text style={{fontSize: 15, fontWeight: "bold", marginRight: 5}}>{`${props.t("data.breaks.list.duration")}:`}</Text>
          <Text style={{fontSize: 15}}>{parseTimestamp(props.data.time)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  </Tab>
);

const SortingTypes = [{
  icon: "sort-alphabetical",
  text: "Name",
  func: (a, b) => {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  }
}, {
  icon: "timelapse",
  text: "Duration",
  func: (a, b) => a.time - b.time
}]

export default props => {
  return (
    <TimersList
      {...props}
      listComponent={BreakRow}
      sortingTypes={SortingTypes}
    />
  );
};

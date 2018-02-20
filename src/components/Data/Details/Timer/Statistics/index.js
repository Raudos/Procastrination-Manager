import React from "react";
import { View, Text, ScrollView } from "react-native";

// Components
import BasicInfo from "src/components/Data/Details/Timer/Statistics/BasicInfo";
import BreakToDurationRatio from "src/components/Data/Details/Timer/Statistics/BreakToDurationPieChart";
import { List as ActivitiesList } from "src/components/Data/Details/Timer/Statistics/ActivitiesList";

export default props => {
  return (
    <View style={{flex: 1, padding: 5}}>
      <ScrollView>
        <BasicInfo {...props} />

        <BreakToDurationRatio {...props} />
      </ScrollView>
    </View>
  )
}

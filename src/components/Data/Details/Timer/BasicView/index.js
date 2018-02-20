import React from "react";
import { View, Text, ScrollView, Dimensions, Switch } from "react-native";
import { Icon, Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

// Components
import Breaks from "src/components/Data/Details/Timer/BasicView/BreakTab";
import Tags from "src/components/Data/Details/Timer/BasicView/TagsTab";
import Name from "src/components/Data/Details/Timer/BasicView/NameTab";
import { TimerTabContainer } from 'src/components/Data/Details/Timer/BasicView/TimerTab';
import Timestamps from "src/components/Data/Details/Timer/BasicView/TimestampsTab";

const onPress = passedProps => {
  passedProps.navigation.navigate({ routeName: 'Tags', params: {id: passedProps.tagData.id}});
};


export default props => {
  const dim = Dimensions.get("window");
  const timerData = props.chosenData;

  if (props.activeTimer && props.activeTimer.id === timerData.id) {
    return (
      <View style={{flex: 1, padding: 5}}>
        <ScrollView>
          <Name {...props} timerData={timerData} dim={dim} active />

          <TimerTabContainer {...props} showTimer timerData={timerData} active />

          <Breaks {...props} timerData={timerData} active />

          <Timestamps {...props} timerData={timerData} active />

          <Tags
            {...props}
            timerData={timerData}
            onPress={onPress}
            active
          />
        </ScrollView>
      </View>
    )
  } else {
    return (
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{padding: 5}} >
          <Name {...props} timerData={timerData} dim={dim} />

          <Timestamps {...props} timerData={timerData} />

          <Breaks {...props} timerData={timerData} />

          <Tags {...props} timerData={timerData} onPress={onPress} />
        </ScrollView>
      </View>
    )
  }
};

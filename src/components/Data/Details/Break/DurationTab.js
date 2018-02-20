import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

// Components
import Tab from "src/components/Tab";
import ModalComponent from "src/components/Modal";
import NameCreator from "src/components/Creator/Name";

// Other
import { parseTimestamp } from "src/reusables/time";
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';

export default props => (
  <Tab>
    <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onPress={() => {
      if (!props.screenProps.activeTimer) {
        this.modalComponent.openModal()
      }
    }}>
      <ModalComponent
        ref={modal => { this.modalComponent = modal; }}
      >
       <NameCreator {...props} update={"updateBreak"} />
      </ModalComponent>

      <Icon
        name={"clock-o"}
        type={"font-awesome"}
        color={accentColor}
        containerStyle={{marginRight: 10}}
        size={55}
      />

      <View style={{flex:1, marginLeft: 10}}>
        <Text style={{fontSize: 20, borderBottomWidth: 2, borderBottomColor: accentColor, paddingBottom: 5}}>{props.screenProps.t("data.breaks.duration.header")}</Text>

        <Text style={{fontSize: 28, fontWeight: "bold"}}>{parseTimestamp(props.chosenData.time)}</Text>
      </View>
    </TouchableOpacity>
  </Tab>
);

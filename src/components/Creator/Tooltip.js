import React from "react";
import { View, Text } from "react-native";
import { Icon } from 'react-native-elements';

// Components
import Tab from "src/components/Tab";

// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';

export default props => {
  return (
    <Tab>
      <View style={{padding: 5}}>
        <Icon
          name={props.icon || "lightbulb-on"}
          type={props.type || "material-community"}
          color={accentColor}
          size={50}
        />

        {props.header ?
          <Text style={{fontSize: 20, marginTop: 5, marginBottom: 5, alignSelf: "center"}}>{props.header.toUpperCase()}</Text>

          :

          null
        }

        <Text style={{marginTop: 5, paddingTop: 5, borderTopWidth: 0.5, borderTopColor: colorPrimary, fontSize: 13}}>
          {props.text}
        </Text>
      </View>
    </Tab>
  )
}

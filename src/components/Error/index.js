import React from "react";
import { View, Image, Text } from "react-native";
import PropTypes from 'prop-types';

// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';

const ErrorComponent = props => {
  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor}}>
      <Image
        style={{
          flex: 1,
          resizeMode: 'contain'
        }}
        source={require("src/assets/images/launch_screen.png")}
      />

      <Text style={{
        color: colorPrimary,
        fontSize: 20,
        position: "absolute",
        bottom: "10%"
      }}>
        {props.errorText}
      </Text>
    </View>
  );
};

ErrorComponent.PropTypes = {
  errorText: PropTypes.string.isRequired
};

export default ErrorComponent;

import React from "react";
import { View, Text, Button } from "react-native";
import PropTypes from 'prop-types';

// Components
import Container from "src/components/Container";
import Language from "src/components/Options/Language";

// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles'

const Options = props => (
  <Container {...props}>
    <View style={{flex: 1, padding: 5}}>
      <Language {...props} />

      <View style={{marginBottom: 10}}>
        <Button
          title={props.screenProps.t("options.deleteData")}
          onPress={props.screenProps.deleteAllData}
          color={colorPrimary}
        />
      </View>

      <View style={{marginBottom: 10}}>
        <Button
          title={props.screenProps.t("options.restoreDefault")}
          onPress={props.screenProps.resetToDefault}
          color={colorPrimary}
        />
      </View>
    </View>
  </Container>
);

Options.propTypes = {
  screenProps: PropTypes.shape({
    t: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
    resetToDefault: PropTypes.func.isRequired,
    deleteAllData: PropTypes.func.isRequired
  })
};

export default Options;

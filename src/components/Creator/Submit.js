import React from "react";
import { View, Button } from "react-native";
import { Button as ButtonElement, Icon } from 'react-native-elements';

// Other
import { colorPrimary, colorSecondary, backgroundColor } from 'src/config/styles';

const ButtonComponent = props => (
  <ButtonElement
    raised
    disabled={props.isDisabled}
    onPress={props.mainOnPress}
    title={props.mainButtonText}
    color={backgroundColor}
    buttonStyle={{backgroundColor: colorPrimary}}
    containerViewStyle={{flex: props.hasBack ? 1 : 0}}
  />
);

export default props => {
  if (props.hasBack) {
    return (
      <View style={{...styles.backContainer, ...props.containerStyles}}>
        <Icon
          reverse
          raised
          size={18}
          onPress={() => props.hasBack()}
          name={'arrow-left'}
          type={'font-awesome'}
          color={colorPrimary}
        />

        <ButtonComponent {...props} />
      </View>
    );
  }

  return (
    <View style={{...styles.container, ...props.containerStyles}}>
      <Button
        onPress={props.mainOnPress}
        title={props.mainButtonText}
        color={colorPrimary}
        disabled={props.isDisabled}
      />
    </View>
  );
};

const styles = {
  container: {
    marginLeft: 5,
    marginRight: 5
  },
  backContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
}

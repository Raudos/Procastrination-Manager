import React from "react";
import { View, Text, TextInput } from "react-native";
import R from "ramda";
import PropTypes from 'prop-types';

// Other
import { colorPrimary, colorSecondary, backgroundColor } from 'src/config/styles';

const Input = props => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      onChangeText={props.onChangeText}
      value={props.value}
      placeholder={props.placeholderText}
      onEndEditing={() => {
        props.onFinish ? props.onFinish() : null;
      }}
      underlineColorAndroid="transparent"
    />
  </View>
);

Input.propTypes = {
  onFinish: PropTypes.func,
  value: PropTypes.string,
  placeholderText: PropTypes.string,
  onChangeText: PropTypes.func.isRequired
};

export default Input;

const styles = {
  header: {
    fontWeight: "bold",
    color: colorPrimary
  },
  input: {

  }
}

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';

// Other
import { colorPrimary, colorSecondary, backgroundColor } from 'src/config/styles';

const sortingOptions = [{text: "Big", int: 2}, {text: "Medium", int: 3}, {text: "Small", int: 5}];


const Sorting = props => {
  const isPicked = props.sorting === props.data.int;

  return (
    <TouchableOpacity style={Object.assign(styles.sorting, isPicked ? styles.sortingPicked : styles.sortingNormal)} onPress={() => props.changeSorting(props.data.int)}>
      <Text style={{color: isPicked ? colorPrimary : backgroundColor, fontWeight: "bold"}}>{props.data.text}</Text>
    </TouchableOpacity>
  );
}

export default props => (
  <View style={styles.container}>
    {props.children}

    {props.hideSorter ?
      null

      :

      <View style={styles.sortingContianer}>
        {sortingOptions.map(val => (
          <Sorting key={val.text} data={val} {...props} />
        ))}
      </View>
    }
  </View>
);

const styles = {
  container: {
    padding: 5,
    backgroundColor: colorPrimary,
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  sortingContianer: {
    flexDirection: "row"
  },
  sorting: {
    padding: 3,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginLeft: 5
  },
  sortingNormal: {
    borderColor: backgroundColor,
    backgroundColor: colorPrimary
  },
  sortingPicked: {
    borderColor: colorSecondary,
    backgroundColor
  }
}

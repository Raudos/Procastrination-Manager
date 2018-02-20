import React from "react";
import { View, Text, TouchableOpacity, FlatList, Dimensions } from "react-native";
import R from "ramda";
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

// Components
import Tab from "src/components/Tab";
import Sorter from "src/components/Sorter";

// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';
import { parseTimestamp } from "src/reusables/time";

const GetTagStyles = (Dimensions, sorting) => {
  const margin = 10;
  const square = Dimensions.width / sorting - margin;

  return {
    width: square - 5,
    height: square - 5,
    backgroundColor: backgroundColor,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2
  };
};

const TagRow = props => (
  <View style={{flexDirection: "row", justifyContent: 'space-around', marginBottom: 10}}>
    {props.data.map(data => (
      <TouchableOpacity
        key={data.id}
        onPress={() => props.navigation.navigate("Tags", {id: data.id})}
        style={props.styles}
      >
        <Icon
          name={data.icon.icon}
          type={data.icon.type}
          color={accentColor}
          size={props.styles.width - 20}
        />
      </TouchableOpacity>
    ))}
  </View>
);

export default class List extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.shape({
      t: PropTypes.func.isRequired,
    })
  };

  constructor(props) {
    super(props);

    this.state = {
      sorting: 3
    };
  };

  changeSorting = int => {
    this.setState({
      sorting: int
    });
  };

  render() {
    const dim = Dimensions.get("window");

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, margin: 5}}>
          <FlatList
            data={R.splitEvery(this.state.sorting, this.props.data)}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <TagRow data={item} navigation={this.props.navigation} t={this.props.screenProps.t} styles={GetTagStyles(dim, this.state.sorting)} />
            )}
          />
        </View>
      </View>
    );
  };
};

// TODO rethink sorting in this List
// <Sorter {...this.state} changeSorting={this.changeSorting} />

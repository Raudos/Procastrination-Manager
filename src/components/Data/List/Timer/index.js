import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import R from "ramda";
import { Icon } from 'react-native-elements';
import PropTypes from 'prop-types';

// Components
import Tab from "src/components/Tab";

// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';
import { parseTimestamp } from "src/reusables/time";

const TimerRow = props => (
  <Tab>
    <TouchableOpacity style={{padding: 5, flexDirection: "row", alignItems: "center"}} onPress={() => props.navigation.navigate("Timers", {id: props.data.id})}>
      <Icon
        name={props.data.icon.icon}
        type={props.data.icon.type}
        color={accentColor}
        size={50}
      />

      <View style={{marginLeft: 20, flex: 1}}>
        <Text style={{borderBottomWidth: 1, borderBottomColor: accentColor, paddingBottom: 5, marginBottom: 5, fontWeight: "bold", fontSize: 20}}>{props.data.name}</Text>

        {props.sorting.text === "Duration" ?
          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-end"}}>
            <Text style={{fontSize: 15, fontWeight: "bold", marginRight: 5}}>{`${props.t(`data.timers.list.sorting.${props.sorting.text}`)}:`}</Text>

            <Text style={{fontSize: 15}}>{props.data.timestamps && props.data.timestamps.length ? parseTimestamp(calcDuration(props.data.timestamps)) : "00"}</Text>
          </View>

          :

          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-end"}}>
            <Text style={{fontSize: 15, fontWeight: "bold", marginRight: 5}}>{`${props.t(`data.timers.list.sorting.${props.sorting.text}`)}:`}</Text>

            <Text style={{fontSize: 15}}>{props.data.timestamps && props.data.timestamps.length ? parseTimestamp(R.takeLast(1, props.data.timestamps)[0].start, "fullDate") : "- - -"}</Text>
          </View>
        }
      </View>
    </TouchableOpacity>
  </Tab>
);


const SortingDirection = props => {
  return (
    <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onPress={props.changeDirection}>
      <Icon
        name="sort-up"
        type="font-awesome"
        color={backgroundColor}
        size={props.asc ? 30 : 20}
      />

      <Icon
        name="sort-down"
        type="font-awesome"
        color={backgroundColor}
        size={props.asc ? 20 : 30}
      />
    </TouchableOpacity>
  );
};

const SortingType = props => {
  const active = props.text === props.sorting.text;

  return (
    <TouchableOpacity style={{ ...{flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 3, marginRight: 10, paddingBottom: 2}, ...(active ? {borderBottomWidth: 0.8, borderBottomColor: backgroundColor} : {})}} onPress={props.changeSorting}>
      <Icon
        name={props.icon}
        type="material-community"
        color={backgroundColor}
        size={active ? 16 : 14}
      />

      <Text style={{marginLeft: 5, color: backgroundColor, fontSize: 13, fontWeight: active ? "bold" : "normal"}}>{props.t(`data.timers.list.sorting.${props.text}`)}</Text>
    </TouchableOpacity>
  );
};

function calcDuration(timestamps = []) {
  if (timestamps.length) {
    return timestamps.reduce((prev, curr) => prev + (curr.end - curr.start), 0);
  }

  return 0;
};

const SortingTypes = [{
  icon: "timer",
  text: "Activity",
  func: (a, b) => {
    const elem1 = a.timestamps && a.timestamps.length ? a.timestamps[a.timestamps.length - 1].start : 0;
    const elem2 = b.timestamps && b.timestamps.length ? b.timestamps[b.timestamps.length - 1].start : 0;

    return elem1 - elem2;
  }
}, {
  icon: "sort-alphabetical",
  text: "Name",
  func: (a, b) => {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
    return 0;
  }
}, {
  icon: "timelapse",
  text: "Duration",
  func: (a, b) => calcDuration(a.timestamps) - calcDuration(b.timestamps)
}]

export default class List extends React.Component {
  static propTypes = {
    sortingTypes: PropTypes.array,
    data: PropTypes.array.isRequired,
    navigation: PropTypes.object.isRequired,
    screenProps: PropTypes.shape({
      t: PropTypes.func.isRequired,
    })
  };

  constructor(props) {
    super(props);

    this.state = {
      sortingTypes: this.props.sortingTypes || SortingTypes,
      sorting: this.props.sortingTypes ? this.props.sortingTypes[0] : SortingTypes[0],
      asc: false
    };
  };

  changeSorting = index => {
    this.setState({
      sorting: this.state.sortingTypes[index]
    });
  };

  changeDirection = () => this.setState(state => ({asc: !state.asc}))

  render() {
    const sortingFunc = this.state.sorting.func;
    const data = this.props.data.concat().sort(sortingFunc);
    const ListComponent = this.props.listComponent || TimerRow;

    return (
      <View style={{flex: 1}}>
        <View style={{padding: 5, backgroundColor: colorPrimary, marginBottom: 5, flexDirection: "row", justifyContent: 'space-between', alignItems: "center"}}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            {this.state.sortingTypes.map((obj, index) => <SortingType key={obj.text} {...obj} changeSorting={() => this.changeSorting(index)} sorting={this.state.sorting} t={this.props.screenProps.t} />)}
          </View>

          <SortingDirection changeDirection={this.changeDirection} asc={this.state.asc} />
        </View>

        <View style={{flex: 1, margin: 5}}>
          <FlatList
            data={(this.state.asc ? data : data.concat().reverse())}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => (
              <ListComponent data={item} navigation={this.props.navigation} t={this.props.screenProps.t} sorting={this.state.sorting} />
            )}
          />
        </View>
      </View>
    );
  };
};

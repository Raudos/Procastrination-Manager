import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import {Agenda} from 'react-native-calendars';
import R from "ramda";
import { Icon } from 'react-native-elements';

// Components
import Tab from "src/components/Tab";

// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';
import { parseTimestamp } from "src/reusables/time";

const Activity = props => {
  const associatedTimer = props.timers.filter(obj => obj.id === props.data.timerId);

  if (associatedTimer.length) {
    let timer = associatedTimer[0];

    return (
      <Tab>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Icon
            name={timer.icon.icon}
            type={timer.icon.type}
            color={accentColor}
            size={35}
          />

          <View style={{flex: 1, marginHorizontal: 10}}>
            <Text style={{fontSize: 20, fontWeight: "bold"}} numberOfLines={1}>{timer.name}</Text>
          </View>

          <Icon
            name={"trash"}
            type={"font-awesome"}
            color={colorPrimary}
            size={20}
            onPress={() => props.deleteActivity(timer.id, props.data.id)}
          />
        </View>

        <View style={{marginTop: 5, paddingTop: 10, borderTopWidth: 0.5, borderTopColor: colorPrimary}}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={{fontWeight: "bold", marginRight: 5}}>{props.t("calendar.started")}</Text>
            <Text>{parseTimestamp(props.data.start, "fromHours")}</Text>
          </View>

          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={{fontWeight: "bold", marginRight: 5}}>{props.t("calendar.duration")}</Text>
            <Text>{parseTimestamp(props.data.end - props.data.start)}</Text>
          </View>
        </View>
      </Tab>
    );
  }


  return null;
};

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
      initial: true,
      usedDatesVariants: []
    };
  };

  componentWillReceiveProps(nextProps) {
    const { currentMonth } = this.agenda;

    this.setState({
      initial: true,
      items: {}
    }, this.loadItems({month: currentMonth.getMonth() + 1, year: currentMonth.getFullYear()}, nextProps, true));
  };

  loadItems = (date, passedProps = false, replaceState = false) => {
    const props = passedProps || this.props;

    function groupTimersIntoDays(timestamps) {
      // assumes timestamps from the same month
      const dayObjs = {};
      // sort them based on start timestamps and push them into their own day
      timestamps.concat().sort((a, b) => a.start - b.start).forEach(obj => {
        const stringDate = parseTimestamp(obj.start, "agendaFormat");

        dayObjs[stringDate] ? dayObjs[stringDate].push(obj) : dayObjs[stringDate] = [obj];
      });


      return dayObjs;
    };

    function getFilteredTimestamps(timestamps, datesArr) {
      // based on provided array of timestamps and dates return array consisting of data meeting the requirements
      return R.flatten(timestamps).filter(obj => {
        const clearedTimestamp = Math.floor(obj.start);
        const timestampDate = new Date(clearedTimestamp * 1000);

        return datesArr.includes(`${timestampDate.getFullYear()}_${timestampDate.getMonth() + 1}`);
      });
    };

    function checkUsedDates(y, m) {
      // return current and adjacent months which werent used before in the filtering
      function isOnEdge(y, m) {
        if (m > 12) {
          return `${y + 1}_1`;
        } else if (m < 1) {
          return `${y - 1}_12`;
        } else {
          return `${y}_${m}`
        }
      }

      var dates = [isOnEdge(y, m - 1), isOnEdge(y, m), isOnEdge(y, m + 1)].filter(date => !this.state.usedDatesVariants.includes(date));

      return dates;
    };

    function updateState() {
      const datesToFilterBy = checkUsedDates.call(this, date.year, date.month);

      // if datesToFilterBy is empty it means that we currently have that date in the state
      if (datesToFilterBy.length) {
        // get all non empty timestamps into an array
        var timestamps = props.data.timers.map(timer => {
          if (timer.timestamps && timer.timestamps.length) {
            return timer.timestamps.map(timestamp => ({...timestamp, timerId: timer.id}));
          }

          return null;
        }).filter(obj => obj);

        // prepare array of filtered timestamps
        const newItems = getFilteredTimestamps(timestamps, datesToFilterBy);

        // update timestamps grouped by day into the state
        // update dates that were used in the filtering to cut on the operations
        this.setState(state => ({
          items: {...state.items, ...groupTimersIntoDays(newItems)},
          initial: false,
          usedDatesVariants: [...state.usedDatesVariants, ...datesToFilterBy]
        }));
      }
    };

    if (replaceState) {
      // fired on deletion or any manipulation on store from other components
      this.setState({
        items: {},
        initial: true,
        usedDatesVariants: []
      }, () => updateState.call(this))
    } else {
      // first load
      setTimeout(() => updateState.call(this), 1000)
    }
  };

  renderItem = (item) => {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: "flex-end", marginTop: 10, marginRight: 5}} onPress={() => this.props.navigation.navigate("Timers", {id: item.timerId})}>
        <Activity data={item} timers={this.props.data.timers} deleteActivity={this.props.deleteActivity} t={this.props.screenProps.t}/>
      </TouchableOpacity>
    );
  };

  renderEmptyDate = () => {
    return (
      <View/>
    );
  };

  renderEmptyData = () => {
    if (this.state.initial) {
      return (
        <View style={{padding: 10, alignItems: "center", flex: 1, justifyContent: 'center'}}>
          <Icon
            name="hourglass"
            type="font-awesome"
            color={accentColor}
            size={50}
          />

          <Text style={{fontSize: 25, fontWeight: "bold", marginTop: 10}}>{this.props.screenProps.t("calendar.loading")}</Text>
        </View>
      );
    }

    return (
      <View style={{padding: 10, alignItems: "center", flex: 1, justifyContent: 'center'}}>
        <Icon
          name="coffee"
          type="font-awesome"
          color={accentColor}
          size={50}
        />

        <Text style={{fontSize: 25, fontWeight: "bold", marginTop: 10}}>{this.props.screenProps.t("calendar.placeholder")}</Text>
      </View>
    );
  };

  rowHasChanged = (r1, r2) => {
    return r1.id !== r2.id;
  };

  timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  render() {
    return (
      <Agenda
        ref={agenda => { this.agenda = agenda }}
        items={this.state.items}
        loadItemsForMonth={this.loadItems}
        selected={new Date()}
        renderItem={this.renderItem}
        renderEmptyDate={this.renderEmptyDate}
        rowHasChanged={this.rowHasChanged}
        renderEmptyData = {this.renderEmptyData}
        theme={{
          backgroundColor: colorSecondary,
          calendarBackground: backgroundColor,
          selectedDayBackgroundColor: accentColor,
          selectedDayTextColor: backgroundColor,
          todayTextColor: accentColor,
          dayTextColor: colorPrimary,
          dotColor: accentColor,
          selectedDotColor: backgroundColor,
          agendaDayTextColor: colorPrimary,
          agendaDayNumColor: colorPrimary,
          agendaTodayColor: accentColor,
          agendaKnobColor: accentColor
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});

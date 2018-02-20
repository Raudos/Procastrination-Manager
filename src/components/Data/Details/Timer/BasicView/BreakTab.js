import React from "react";
import { View, Text, ScrollView, Dimensions, Switch, TouchableOpacity } from "react-native";
import { Icon, Button } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import R from "ramda";

// Other
import { parseTimestamp } from "src/reusables/time";
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';

// Components
import ModalComponent from "src/components/Modal";
import TagsNBreaks from "src/components/Creator/TagsNBreaks";
import Tab from "src/components/Tab";

const BreakButton = props => {
  const { t } = props.screenProps;

  if (props.active) {
    return (
      <TouchableOpacity
        style={styles.breakContainer}
        onPress={() => {
          props.navigation.navigate({ routeName: 'Breaks', params: {id: props.breakData.id}})
        }}
      >
        <Icon
          name={props.breakData.icon.icon}
          type={props.breakData.icon.type}
          color={accentColor}
          containerStyle={{marginRight: 10}}
          size={40}
        />

        <View style={{flex: 1}}>
          <Text style={styles.breakHeader}>{props.breakData.name}</Text>

          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={{fontSize: 15, fontWeight: "bold", marginRight: 5}}>{`${t("data.timers.breaks.duration")}:`}</Text>
            <Text style={{fontSize: 15}}>{parseTimestamp(props.breakData.time)}</Text>
          </View>
        </View>

        {props.activeTimer.activeBreak ?
          null

          :

          <Icon
            name={"pause"}
            type={"font-awesome"}
            color={accentColor}
            size={30}
            containerStyle={{marginLeft: 5, marginRight: 5}}
            onPress={() => props.activateBreak(props.breakData.id)}
          />
        }
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity
        style={styles.breakContainer}
        onPress={() => {
          props.navigation.navigate({ routeName: 'Breaks', params: {id: props.breakData.id}})
        }}
      >
        <Icon
          name={props.breakData.icon.icon}
          type={props.breakData.icon.type}
          color={accentColor}
          containerStyle={{marginRight: 10}}
          size={40}
        />

        <View style={{flex: 1}}>
          <Text style={styles.breakHeader}>{props.breakData.name}</Text>

          <View style={{flexDirection: "row", alignItems: "center"}}>
            <Text style={{fontSize: 15, fontWeight: "bold", marginRight: 5}}>{`${t("data.timers.breaks.duration")}:`}</Text>
            <Text style={{fontSize: 15}}>{parseTimestamp(props.breakData.time)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default class BreakTab extends React.Component {
  render() {
    const objData = this.props.timerData.breaks.map(id => R.find(R.propEq('id', id))(this.props.data.breaks))
    const hasData = this.props.data.breaks.length;

    return (
      <Tab
        header={this.props.screenProps.t('data.timers.breaks.header')}
        showRightIcon={!this.props.active}
        color={accentColor}
        iconName={hasData ? "edit" : "plus-square-o"}
        onRightIconPress={() => {
          if (hasData) {
            this.modalComponent.openModal()
          } else {
            this.props.navigation.navigate("BreakCreator");
          }
        }}
      >
        <ModalComponent
          ref={modal => { this.modalComponent = modal; }}
        >
         <TagsNBreaks {...this.props} update="updateTimer" />
        </ModalComponent>

        <View style={styles.listContainer}>
          {objData.length ?
            null

            :

            <Text>{this.props.screenProps.t(`data.timers.breaks.placeholder.${hasData ? "data" : "noData"}`)}</Text>
          }

          {objData.map(obj => <BreakButton key={obj.id} {...this.props} breakData={obj} />)}
        </View>
      </Tab>
    );
  }
}

const styles = {
  listContainer: {
    marginTop: 5,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: colorPrimary
  },
  listEmptyContainer: {
    marginTop: 0
  },
  breakHeader: {
    fontSize: 15,
    marginRight: 10,
    borderBottomWidth: 1,
    borderColor: colorPrimary,
    paddingBottom: 2,
    fontWeight: "bold",
    borderBottomColor: accentColor
  },
  breakContainer: {
    borderColor: colorSecondary,
    backgroundColor: colorSecondary,
    borderRadius: 10,
    borderWidth: 2,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    padding: 5,
    marginBottom: 10
  }
}

import React from "react";
import { View, Text, ScrollView, Dimensions, Switch, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import R from "ramda";

// Components
import Tab from "src/components/Tab";
import ModalComponent from "src/components/Modal";
import TagsNBreaks from "src/components/Creator/TagsNBreaks";

// Other
import { colorPrimary, colorSecondary, backgroundColor, accentColor } from 'src/config/styles';

export const TagButton = props => (
  <TouchableOpacity
    style={{elevation: 2, borderRadius: 10, borderWidth: 2, borderColor: colorSecondary, backgroundColor: colorSecondary, flexDirection: "row", alignItems: "center", elevation: 2, padding: 5, marginBottom: props.active ? 5 : 10, marginRight: props.active ? 10 : 0}}
    onPress={() => {
      props.onPress ? props.onPress(props) : null;
    }}
  >
    <Icon
      name={props.tagData.icon.icon}
      type={props.tagData.icon.type}
      color={accentColor}
      containerStyle={{marginRight: props.active ? 0 : 10}}
      size={25}
    />

    {props.active ?
      null

      :

      <Text style={{fontSize: 15, fontWeight: "bold"}}>{props.tagData.name}</Text>
    }
  </TouchableOpacity>
);

export default class TagsTab extends React.Component {
  render() {
    const objData = this.props.timerData.tags.map(id => R.find(R.propEq('id', id))(this.props.data.tags));
    const hasData = this.props.data.tags.length;

    return (
      <Tab
        header={this.props.screenProps.t("data.timers.tags.header")}
        showRightIcon={!this.props.active}
        iconName={hasData ? "edit" : "plus-square-o"}
        onRightIconPress={() => {
          if (hasData) {
            this.modalComponent.openModal()
          } else {
            this.props.navigation.navigate("TagCreator");
          }
        }}
      >
        <ModalComponent
          ref={modal => { this.modalComponent = modal; }}
        >
         <TagsNBreaks {...this.props} update="updateTimer" />
        </ModalComponent>


        <View style={Object.assign({}, styles.listContainer, {justifyContent: this.props.active ? "flex-start" : "space-between"})}>
          {objData.length ?
            null

            :

            <Text>{this.props.screenProps.t(`data.timers.tags.placeholder.${hasData ? "data" : "noData"}`)}</Text>
          }

          {objData.map(obj => <TagButton key={obj.id} {...this.props} tagData={obj} />)}
        </View>
      </Tab>
    );
  };
};

const styles = {
  listContainer: {
    flexDirection: "row",
    flexWrap: 'wrap',
    marginTop: 5,
    paddingTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: colorPrimary
  }
}
